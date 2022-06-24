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
  getCurrentUser: () => {
    return get().users[0];
  },
  getAmountVotedForCandidate: candidateId => {
    const userId = get().getCurrentUser().id;

    const existingVote = get().votes.find(
      vote => vote.candidateId == candidateId && vote.userId == userId
    );
    return typeof existingVote == 'undefined' ? 0 : existingVote.amount;
  },
  voteForCandidate: (candidateId, amount) => {
    console.log('voting for candidate');
    const userId = get().currentUser.id;

    const newVote = {
      candidateId: { candidateId },
      userId: { userId },
      amount: { amount },
    };

    const existingVote = get().votes.find(
      vote => vote.candidateId == candidateId && vote.userId == userId
    );

    if (typeof existingVote == 'undefined') {
      set(state => ({ votes: { ...state.votes, newVote } }));
    } else {
      set(state => ({
        votes: { ...state.votes.filter(vote => vote != existingVote), newVote },
      }));
    }
  },
}));

export default useStore;
