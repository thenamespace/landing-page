export interface Author {
  name: string;
  avatar: string;
  link?: string;
}

export const AUTHORS: Record<string, Author> = {
  Cap: {
    name: "Cap",
    avatar: "/assets/images/thecap-avatar.jpg",
    link: "https://x.com/thecapeth",
  },
  Happy: {
    name: "Happy",
    avatar: "/assets/images/happysingh-avatar.jpg", // TODO: add happy-avatar.jpg
    link: "https://x.com/happys1ngh",
  },
};

export function getAuthor(name?: string): Author | null {
  if (!name) return null;
  return AUTHORS[name] ?? { name, avatar: "/assets/images/thecap-avatar.jpg" };
}
