/**
 * Single source of truth for the team: the About page accordion, blog author
 * bylines and Person JSON-LD all read from here so handles can't drift apart.
 */
export interface TeamMember {
  ens: string;
  nick: string;
  role: string;
  /** X handle without the @, or null if the member isn't on X. */
  x: string | null;
  img: string;
}

export const TEAM: TeamMember[] = [
  { ens: "cap.eth", nick: "cap", role: "CEO", x: "thecaphimself", img: "/assets/images/team/cap.jpg" },
  { ens: "artii.eth", nick: "arti", role: "CTO", x: "artii_eth", img: "/assets/images/team/artii.jpg" },
  { ens: "happysingh.eth", nick: "happy", role: "DevRel", x: "HAPPYS1NGH", img: "/assets/images/team/happysingh.png" },
  { ens: "khanye.eth", nick: "usman", role: "BizDev", x: "0xkhanye", img: "/assets/images/team/khanye.jpg" },
  { ens: "envoy1084.eth", nick: "vedant", role: "Engineer", x: "envoy1084", img: "/assets/images/team/envoy1084.jpg" },
  { ens: "maxi.eth", nick: "maxi", role: "Growth", x: "maxidoteth", img: "/assets/images/team/maxi.jpg" },
  { ens: "djora.eth", nick: "snowman", role: "DevOps", x: null, img: "/assets/images/team/djora.jpg" },
];

export function getTeamMember(ens: string): TeamMember | undefined {
  return TEAM.find((m) => m.ens === ens);
}

/** Stable JSON-LD @id for a team member, anchored on the About page. */
export function personId(siteUrl: string, member: TeamMember): string {
  return `${siteUrl}/about#${member.ens.replace(/\.eth$/, "")}`;
}
