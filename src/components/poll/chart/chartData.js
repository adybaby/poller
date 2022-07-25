import { SKILL_LEVELS } from '../../../constants';

function calcTotalVotesForCandidate(currentPollVotes, candidateId, filter) {
  if (typeof filter == 'undefined') {
    filter = vote => vote;
  }
  return currentPollVotes
    .filter(vote => vote.candidateId == candidateId)
    .filter(filter)
    .reduce((total, vote) => total + vote.amount, 0);
}

function calcVotesForCandidateBySkillLevels(
  currentPollVotes,
  users,
  candidateId,
  skillId,
  skillName
) {
  const result = {};
  SKILL_LEVELS.forEach((skillLevel, index) => {
    result[
      typeof skillName == 'undefined'
        ? skillLevel
        : skillName + ' ' + skillLevel
    ] = calcTotalVotesForCandidate(currentPollVotes, candidateId, vote => {
      const currentUser = users.find(user => user.id == vote.userId);
      return (
        currentUser.skillLevel == index + 1 &&
        (typeof skillId == 'undefined' || currentUser.skillId == skillId)
      );
    });
  });
  if (typeof skillName != 'undefined') {
    result['Different skill from ' + skillName] = calcTotalVotesForCandidate(
      currentPollVotes,
      candidateId,
      vote => users.find(user => user.id == vote.userId).skillId != skillId
    );
  }
  return result;
}

function calcVotesForEachSkill(
  currentPollVotes,
  users,
  requiredSkills,
  candidateId
) {
  var result = {};
  requiredSkills.forEach(rs => {
    result = {
      ...result,
      ...calcVotesForCandidateBySkillLevels(
        currentPollVotes,
        users,
        candidateId,
        rs.id,
        rs.name
      ),
    };
  });
  return result;
}

function calcVotesForCandidateByArea(
  currentPollVotes,
  areas,
  users,
  candidateId
) {
  const result = {};
  areas.forEach(area => {
    result[area.name] = calcTotalVotesForCandidate(
      currentPollVotes,
      candidateId,
      vote => users.find(user => user.id == vote.userId).areaId == area.id
    );
  });
  return result;
}

export function calcChartData(
  currentPoll,
  votes,
  areas,
  users,
  requiredSkills
) {
  const currentPollVotes = votes.filter(vote => vote.pollId == currentPoll.id);
  return currentPoll.groups
    .reduce(
      (candidates, group) => [
        ...candidates,
        ...group.candidates.map(candidate => ({
          name: candidate.name,
          votes: calcTotalVotesForCandidate(currentPollVotes, candidate.id),
          ...calcVotesForCandidateByArea(
            currentPollVotes,
            areas,
            users,
            candidate.id
          ),
          ...calcVotesForCandidateBySkillLevels(
            currentPollVotes,
            users,
            candidate.id
          ),
          ...calcVotesForEachSkill(
            currentPollVotes,
            users,
            requiredSkills,
            candidate.id
          ),
        })),
      ],
      []
    )
    .sort((a, b) => {
      return b.votes - a.votes;
    });
}

const getSkillsForPoll = (currentPoll, votes, users, skills) => {
  const currentPollVotes = votes.filter(vote => vote.pollId == currentPoll.id);
  const includedSkills = currentPollVotes
    .reduce((includedSkills, vote) => {
      const user = users.find(user => user.id == vote.userId);
      if (
        typeof user.skillId != 'undefined' &&
        !includedSkills.includes(user.skillId)
      ) {
        return [...includedSkills, user.skillId];
      } else return includedSkills;
    }, [])
    .map(skillId => ({
      id: skillId,
      name: skills.find(s => s.id == skillId).name,
    }));
  return includedSkills;
};

export const getRequiredSkills = (currentPoll, votes, users, skills) => {
  return currentPoll.requiredSkills.length == 0
    ? getSkillsForPoll(currentPoll, votes, users, skills)
    : currentPoll.requiredSkills.map(rsid => ({
        id: rsid,
        name: skills.find(s => s.id == rsid).name,
      }));
};

export const createFilterTypes = (currentPoll, areas, skills) => {
  const cfts = [
    { label: 'All Votes', dataKeys: [{ key: 'votes', name: 'votes' }] },
    {
      label: 'Broken down by Area',
      dataKeys: areas.map(area => ({ key: area.name, name: area.name })),
    },
    {
      label: 'Broken down by skills (summarised)',
      dataKeys: SKILL_LEVELS.map(lvl => ({ key: lvl, name: lvl })),
    },
  ];

  if (currentPoll.requiredSkills.length > 0) {
    cfts.push({
      label: 'Broken down by skills (detail)',
      dataKeys: skills.reduce(
        (allKeys, skill) => [
          ...allKeys,
          ...SKILL_LEVELS.map(lvl => ({
            key: skill.name + ' ' + lvl,
            name: skill.name + ' ' + lvl,
          })),
        ],
        []
      ),
    });
  }

  cfts.push(
    ...skills.map(skill => ({
      label: 'Broken down by skill: ' + skill.name,
      dataKeys: [
        ...SKILL_LEVELS.map(lvl => ({
          key: skill.name + ' ' + lvl,
          name: lvl,
        })),
        { key: 'Different skill from ' + skill.name, name: 'Other skills' },
      ],
    }))
  );

  return cfts;
};
