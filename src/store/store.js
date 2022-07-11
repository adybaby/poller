import create from 'zustand';
import * as data from './data/data';

const useStore = create((set, get) => ({
  areas: data.getAreas(),
  skills: data.getSkills(),
  polls: data.getPolls(),
  users: data.getUsers(),
  votes: data.getVotes(),
  currentUser: undefined,
  currentPoll: undefined,
  currentVotes: undefined,
  pointsSpent: undefined,
  err: '',
  setCurrentUser: userId => {
    set(state => ({
      currentUser: state.users.find(user => user.id == userId),
    }));
  },
  setErr: err => {
    set(() => ({ err }));
  },
  getAmountVotedForCandidate: (userId, candidateId) => {
    const existingVote = get().votes.find(
      vote => vote.candidateId == candidateId && vote.userId == userId
    );

    return typeof existingVote == 'undefined' ? 0 : existingVote.amount;
  },
  initPoll: pollId => {
    const userId = get().currentUser.id;
    var currentPoll;

    if (typeof pollId == 'undefined') {
      currentPoll = get().polls[0];
    } else {
      currentPoll = get().polls.find(poll => poll.id == pollId);
    }

    const currentVotes = [];
    var pointsSpent = 0;

    currentPoll.groups.forEach(group => {
      group.candidates.forEach(candidate => {
        const votes = get().getAmountVotedForCandidate(userId, candidate.id);
        currentVotes.push(votes);
        pointsSpent += votes ** 2;
      });
    });

    set(() => ({ currentPoll, currentVotes, pointsSpent }));
  },
  voteForCandidate: (voteIndex, candidateId, amount) => {
    const userId = get().currentUser.id;
    var existingAmount = get().currentVotes[voteIndex];
    const newTotal = get().pointsSpent - existingAmount ** 2 + amount ** 2;

    if (newTotal > 16) {
      throw (
        'You can spend up to 16 points on votes in this poll, and this vote would take you to ' +
        newTotal +
        '. Reduce you votes on other candidates to vote more.'
      );
    }

    const newCurrentVotes = [...get().currentVotes];
    newCurrentVotes[voteIndex] = amount;

    set(() => ({ currentVotes: newCurrentVotes }));
    set(() => ({ pointsSpent: newTotal }));

    if (amount == 0) {
      set(state => ({
        votes: state.votes.filter(
          vote => !(vote.candidateId == candidateId && vote.userId == userId)
        ),
      }));
    } else {
      const newVote = {
        pollId: get().currentPoll.id,
        candidateId,
        userId,
        amount,
      };

      const existingVote = get().votes.find(
        vote => vote.userId == userId && vote.candidateId == candidateId
      );

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
