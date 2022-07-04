import pollsFile from './polls.json';
import areasFile from './areas.json';
import skillsFile from './skills.json';
import usersFile from './users.json';
import votesFile from './votes.json';

export function getAreas() {
  return JSON.parse(JSON.stringify(areasFile));
}
export function getSkills() {
  return JSON.parse(JSON.stringify(skillsFile));
}
export function getPolls() {
  return JSON.parse(JSON.stringify(pollsFile));
}
export function getUsers() {
  return JSON.parse(JSON.stringify(usersFile));
}
export function getVotes() {
  return JSON.parse(JSON.stringify(votesFile));
}
