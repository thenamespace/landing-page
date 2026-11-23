import { Geist_Mono } from "next/font/google";
import { FlyoverAnimation } from "./FlyoverAnimation";
import "./hero-flyover.css";

/* Names and addresses render in Geist Mono; the site's 'SF Mono' stack falls back to Courier outside Safari. */
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--uuh-mono" });

/** Universal Usernames hero visual: @happy leaves your app as happy.brand.eth and a wallet pays it. */
export function HeroFlyover() {
  return (
    <div className={mono.variable}>
      <FlyoverAnimation />
    </div>
  );
}
