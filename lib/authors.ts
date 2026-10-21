import { getTeamMember, type TeamMember } from "./team";

export interface Author {
  name: string;
  avatar: string;
  link?: string;
  /** Team record this byline maps to (drives Person schema + author box). */
  member?: TeamMember;
  bio?: string;
}

function fromTeam(name: string, ens: string, avatar: string, bio: string): Author {
  const member = getTeamMember(ens);
  return {
    name,
    avatar,
    link: member?.x ? `https://x.com/${member.x}` : undefined,
    member,
    bio,
  };
}

export const AUTHORS: Record<string, Author> = {
  Cap: fromTeam(
    "Cap",
    "cap.eth",
    "/assets/images/thecap-avatar.jpg",
    "CEO of Namespace, an ENS DAO service provider building naming infrastructure for wallets, L2s, apps and AI agents.",
  ),
  Happy: fromTeam(
    "Happy",
    "happysingh.eth",
    "/assets/images/happysingh-avatar.png",
    "DevRel at Namespace, helping teams integrate ENS subnames through the Namespace SDK, API and app.",
  ),
};

export function getAuthor(name?: string): Author | null {
  if (!name) return null;
  return AUTHORS[name] ?? { name, avatar: "/assets/images/thecap-avatar.jpg" };
}
