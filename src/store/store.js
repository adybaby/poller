import create from 'zustand';
import pollsFile from './polls.json';
import areasFile from './areas.json';
import skillsFile from './skills.json';
import usersFile from './users.json';
import votesFile from './votes.json';

const useStore = create((set, get) => ({
  areas: JSON.parse(JSON.stringify(areasFile)),
  skills: JSON.parse(JSON.stringify(skillsFile)),
  polls: JSON.parse(JSON.stringify(pollsFile)),
  users: JSON.parse(JSON.stringify(usersFile)),
  votes: JSON.parse(JSON.stringify(votesFile)),
  currentUser: undefined,
  currentPoll: undefined,
  pointsSpent: 0,
  err: '',
  setCurrentUser: userId => {
    set(state => ({
      currentUser: state.users.find(user => user.id == userId),
    }));
  },
  setErr: err => {
    set(() => ({ err }));
  },
  initPointsSpent: () => {
    const userId = get().currentUser.id;
    const pollId = get().currentPoll.id;
    const pollVotes = get().votes.filter(vote => (vote.pollId = pollId));
    const userVotes = pollVotes.filter(vote => vote.userId == userId);

    const pointsSpent = userVotes.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount ** 2,
      0
    );
    set(() => ({ pointsSpent }));
  },
  initPoll: pollId => {
    set(state => ({
      currentPoll: state.polls.find(poll => poll.id == pollId),
    }));
    get().initPointsSpent();
  },
  getAmountVotedForCandidate: candidateId => {
    const userId = get().currentUser.id;
    const existingVote = get().votes.find(
      vote => vote.candidateId == candidateId && vote.userId == userId
    );
    return typeof existingVote == 'undefined' ? 0 : existingVote.amount;
  },
  voteForCandidate: (candidateId, amount) => {
    const userId = get().currentUser.id;

    const existingVote = get().votes.find(
      vote => vote.candidateId == candidateId && vote.userId == userId
    );

    var existingAmount = 0;

    if (typeof existingVote != 'undefined') {
      existingAmount = existingVote.amount;
    }

    const newTotal = get().pointsSpent - existingAmount ** 2 + amount ** 2;

    if (newTotal > 16) {
      throw (
        'You can spend up to 16 points on votes in this poll, and this vote would take you to ' +
        newTotal +
        '. Reduce you votes on other candidates to vote more.'
      );
    }

    set(() => ({ pointsSpent: newTotal }));

    if (amount == 0) {
      set(state => ({
        votes: state.votes.filter(
          vote => !(vote.candidateId == candidateId && vote.userId == userId)
        ),
      }));
    } else {
      const newVote = {
        candidateId,
        userId,
        amount,
      };

      if (typeof existingVote == 'undefined') {
        set(state => ({ votes: [...state.votes, newVote] }));
      } else {
        set(state => ({
          votes: [...state.votes.filter(vote => vote != existingVote), newVote],
        }));
      }
    }
  },
}));

export default useStore;
