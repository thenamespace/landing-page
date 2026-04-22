"use client";

import { useState, useRef, useEffect } from "react";

/* ─── SVG logo (inline, matches the original Webflow navbar) ─── */
function NamespaceLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 193 28" fill="none">
      <path d="M24.0685 9.06577C23.9223 8.80161 23.7659 8.54259 23.6069 8.2887C25.3405 7.02949 27.4127 6.20627 29.6619 5.98828V0C26.3279 0.948892 23.5736 3.25957 22.0271 6.2909C19.6985 3.87763 16.4287 2.37479 12.81 2.37479C5.73695 2.37223 0 8.10662 0 15.1823C0 22.2579 5.73695 27.9923 12.81 27.9923C19.8831 27.9923 25.6201 22.2554 25.6201 15.1823C25.6201 13.7384 25.3764 12.3535 24.9379 11.0584C25.2713 11.1123 25.6073 11.1841 25.9381 11.2739C26.5613 11.4406 27.1511 11.6688 27.7153 11.9355L29.708 8.48617C27.7512 8.13995 25.8099 8.3682 24.066 9.06577H24.0685ZM20.3627 18.4265V18.4777C19.542 19.0394 18.4316 19.2856 17.416 19.1266C16.344 18.9496 15.4259 18.2495 14.5283 17.7212C13.6692 17.2314 12.7511 16.7723 11.7586 16.5825C9.70947 16.1953 7.99121 17.3904 6.5294 18.529C6.0806 18.8804 5.5523 19.2138 4.94963 19.2292C1.90548 19.3523 2.02345 14.1898 2.33376 12.5561C2.4902 11.7842 2.97747 10.4147 3.81608 9.67613C4.26488 9.2735 4.82909 9.06064 5.47536 9.23759C5.88569 9.34274 6.21909 9.64023 6.47298 9.95567C6.80638 10.3763 7.01924 10.9559 7.62448 11.0969C7.89888 11.1662 8.21176 11.0969 8.46309 10.9738C9.1863 10.6404 9.71204 10.0249 10.2788 9.55047C11.4483 8.55029 12.8177 7.81425 14.436 7.6373C16.3107 7.44496 18.3008 7.84759 19.8421 8.84778C23.0042 10.92 23.6095 16.2209 20.3704 18.4162L20.3627 18.4265Z" fill="white"/>
      <path d="M50.8401 13.3384V23.012H45.5365V14.7027C45.5365 12.6408 44.6312 11.9715 43.3207 11.9715C41.7922 11.9715 40.5125 12.9306 40.5125 15.3413V23.0094H35.209V8.48364H39.9509L40.1073 11.3021C41.0742 9.24019 42.9771 8.19385 45.4416 8.19385C48.655 8.19385 50.8401 9.96597 50.8401 13.3358V13.3384Z" fill="white"/>
      <path d="M68.7206 20.0781L68.3154 22.8376C67.6922 23.1581 66.9741 23.3017 66.1945 23.3017C64.1044 23.3017 62.6375 22.6324 62.1681 21.0654C61.2936 22.4606 59.4856 23.3017 56.6158 23.3017C53.5281 23.3017 51.7791 22.0246 51.7791 19.6703C51.7791 17.316 53.4332 15.7209 57.8622 14.9053L61.3885 14.2668V13.7436C61.3885 12.4357 60.5781 11.5945 59.1727 11.5945C57.675 11.5945 56.5825 12.1459 56.2722 13.8308L51.9663 12.669C52.4971 9.90955 54.9309 8.19385 59.1727 8.19385C63.9787 8.19385 66.6305 10.025 66.6305 13.7718V19.0599C66.6305 19.8139 67.0049 20.1935 67.7538 20.1935C68.1282 20.1935 68.4411 20.1653 68.7206 20.0781ZM61.3885 18.0444V16.7954L58.8624 17.3468C57.5519 17.6366 57.021 18.0444 57.021 18.8573C57.021 19.6703 57.5827 20.1063 58.5495 20.1063C59.86 20.1063 61.3885 19.3805 61.3885 18.0444Z" fill="white"/>
      <path d="M94.584 13.3383L94.5224 23.0118H89.2804V14.4718C89.2804 12.6407 88.4392 11.9739 87.1595 11.9739C85.5695 11.9739 84.4129 13.0767 84.4129 15.2566V23.0144H79.1093V14.4744C79.1093 12.6433 78.2348 11.9765 76.9884 11.9765C75.5215 11.9765 74.2418 12.9638 74.2418 15.3463V23.0144H68.9382V8.48865H73.6801L73.8366 11.2763C74.8342 9.24264 76.7063 8.19629 79.0786 8.19629C81.4508 8.19629 83.2588 9.18365 84.0384 11.1302C85.0361 9.21186 86.9723 8.19629 89.2497 8.19629C92.3066 8.19629 94.6147 9.9402 94.584 13.3383Z" fill="white"/>
      <path d="M111.464 17.1723H100.826C101.17 19.0598 102.324 19.8164 104.101 19.8164C105.661 19.8164 106.627 19.2342 106.971 18.2186L111.277 19.4958C110.372 22.0219 107.72 23.3016 104.101 23.3016C98.6414 23.3016 95.6768 20.5421 95.6768 15.749C95.6768 10.9558 98.6081 8.19629 103.819 8.19629C109.03 8.19629 111.621 10.9558 111.621 15.5464C111.621 16.0388 111.559 16.7953 111.464 17.1723ZM100.826 14.5H106.692C106.412 12.6407 105.445 11.6533 103.791 11.6533C102.137 11.6533 101.109 12.5253 100.826 14.5Z" fill="white"/>
      <path d="M111.559 20.7447L114.306 17.9571C115.242 19.4086 116.927 20.019 118.922 20.019C120.389 20.019 121.264 19.6112 121.264 19.0034C121.264 18.452 120.515 18.1032 118.425 17.6955C113.683 16.8235 111.967 15.4002 111.967 13.0177C111.967 10.6352 114.401 8.19629 119.486 8.19629C123.231 8.19629 125.29 9.21186 126.631 10.9276L123.885 13.4255C122.887 12.0611 121.512 11.4789 119.64 11.4789C118.081 11.4789 117.268 12.0021 117.268 12.5817C117.268 13.1613 117.955 13.5409 120.138 13.9179C124.754 14.6718 126.595 16.0388 126.595 18.5366C126.595 21.2089 124.192 23.3016 119.171 23.3016C115.739 23.3016 113.149 22.5476 111.557 20.7447H111.559Z" fill="white"/>
      <path d="M143.914 15.6924C143.914 20.5138 141.48 23.3041 137.487 23.3041C135.24 23.3041 133.65 22.2295 132.776 20.601V27.9998H127.472V8.48853H132.122L132.278 11.5686C133.119 9.56308 134.93 8.19873 137.489 8.19873C141.547 8.19873 143.916 10.9582 143.916 15.6924H143.914ZM138.577 15.7514C138.577 13.0201 137.453 11.8302 135.645 11.8302C133.837 11.8302 132.776 13.1073 132.776 15.6052V15.895C132.776 18.3057 133.804 19.6701 135.645 19.6701C137.487 19.6701 138.577 18.4801 138.577 15.7488V15.7514Z" fill="white"/>
      <path d="M161.073 20.0781L160.668 22.8376C160.045 23.1581 159.327 23.3017 158.547 23.3017C156.457 23.3017 154.99 22.6324 154.523 21.0654C153.649 22.4606 151.841 23.3017 148.971 23.3017C145.883 23.3017 144.134 22.0246 144.134 19.6703C144.134 17.316 145.788 15.7209 150.217 14.9053L153.743 14.2668V13.7436C153.743 12.4357 152.933 11.5945 151.528 11.5945C150.03 11.5945 148.937 12.1459 148.625 13.8308L144.319 12.669C144.85 9.90955 147.283 8.19385 151.525 8.19385C156.331 8.19385 158.983 10.025 158.983 13.7718V19.0599C158.983 19.8139 159.357 20.1935 160.106 20.1935C160.481 20.1935 160.793 20.1653 161.073 20.0781ZM153.741 18.0444V16.7954L151.215 17.3468C149.904 17.6366 149.373 18.0444 149.373 18.8573C149.373 19.6703 149.935 20.1063 150.902 20.1063C152.212 20.1063 153.741 19.3805 153.741 18.0444Z" fill="white"/>
      <path d="M176.143 12.6997L171.214 14.2102C170.996 12.5253 170.216 11.7123 168.811 11.7123C166.813 11.7123 165.723 12.9613 165.723 15.8079C165.723 18.6546 166.941 19.7882 168.811 19.7882C170.308 19.7882 171.152 18.947 171.401 17.4339L176.173 18.8572C175.738 21.3833 173.209 23.3016 168.841 23.3016C163.381 23.3016 160.417 20.5139 160.417 15.749C160.417 10.984 163.443 8.19629 168.623 8.19629C173.804 8.19629 175.643 10.3454 176.143 12.6997Z" fill="white"/>
      <path d="M192.148 17.1723H181.51C181.854 19.0598 183.008 19.8164 184.785 19.8164C186.344 19.8164 187.311 19.2342 187.655 18.2186L191.961 19.4958C191.056 22.0219 188.404 23.3016 184.785 23.3016C179.325 23.3016 176.361 20.5421 176.361 15.749C176.361 10.9558 179.292 8.19629 184.503 8.19629C189.714 8.19629 192.305 10.9558 192.305 15.5464C192.305 16.0388 192.243 16.7953 192.148 17.1723ZM181.51 14.5H187.375C187.096 12.6407 186.129 11.6533 184.475 11.6533C182.821 11.6533 181.792 12.5253 181.51 14.5Z" fill="white"/>
    </svg>
  );
}

/* ─── Arrow icon for buttons ─── */
function ButtonArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="auto" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Navbar icon for dropdown items ─── */
function NavIcon({ children }: { children: React.ReactNode }) {
  return <div className="navbar_icon w-embed">{children}</div>;
}

/* ─── Webflow-style button ─── */
function WfButton({ href, label, variant = "primary" }: { href: string; label: string; variant?: "primary" | "secondary" }) {
  const variantClass = variant === "secondary" ? "w-variant-9e301513-bb31-a799-9ca0-2d690dec60e2" : "";
  return (
    <a
      data-wf--component-button-primary--variant={variant}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`button w-inline-block ${variantClass}`}
    >
      <div className="button_text">{label}</div>
      <div className={`button_icon-wrapper ${variantClass}`}>
        <div className="button_icon-item">
          <div className="button_icon is-hover w-embed"><ButtonArrow /></div>
        </div>
        <div className="button_icon-item">
          <div className="button_icon is-hover w-embed"><ButtonArrow /></div>
        </div>
      </div>
    </a>
  );
}

/* ─── Solutions dropdown SVG icons ─── */
function WalletsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 10C17.5 9.50272 17.3025 9.02581 16.9508 8.67417C16.5992 8.32254 16.1223 8.125 15.625 8.125H12.5C12.5 8.78804 12.2366 9.42393 11.7678 9.89277C11.2989 10.3616 10.663 10.625 10 10.625C9.33696 10.625 8.70107 10.3616 8.23223 9.89277C7.76339 9.42393 7.5 8.78804 7.5 8.125H4.375C3.87772 8.125 3.40081 8.32254 3.04917 8.67417C2.69754 9.02581 2.5 9.50272 2.5 10M17.5 10V15C17.5 15.4973 17.3025 15.9742 16.9508 16.3258C16.5992 16.6775 16.1223 16.875 15.625 16.875H4.375C3.87772 16.875 3.40081 16.6775 3.04917 16.3258C2.69754 15.9742 2.5 15.4973 2.5 15V10M17.5 10V7.5M2.5 10V7.5M17.5 7.5C17.5 7.00272 17.3025 6.52581 16.9508 6.17417C16.5992 5.82254 16.1223 5.625 15.625 5.625H4.375C3.87772 5.625 3.40081 5.82254 3.04917 6.17417C2.69754 6.52581 2.5 7.00272 2.5 7.5M17.5 7.5V5C17.5 4.50272 17.3025 4.02581 16.9508 3.67417C16.5992 3.32254 16.1223 3.125 15.625 3.125H4.375C3.87772 3.125 3.40081 3.32254 3.04917 3.67417C2.69754 4.02581 2.5 4.50272 2.5 5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RollupsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13.3522 7.78922H17.5122L14.8613 5.13672C14.0079 4.28328 12.9448 3.66955 11.779 3.35722C10.6132 3.0449 9.38567 3.04499 8.21989 3.35749C7.0541 3.66998 5.99113 4.28387 5.13783 5.13744C4.28452 5.99101 3.67096 7.05417 3.35883 8.22005M2.48716 16.3692V12.2092M2.48716 12.2092H6.64716M2.48716 12.2092L5.13716 14.8617C5.99059 15.7152 7.05366 16.3289 8.21948 16.6412C9.38531 16.9535 10.6128 16.9534 11.7786 16.6409C12.9444 16.3285 14.0074 15.7146 14.8607 14.861C15.714 14.0074 16.3275 12.9443 16.6397 11.7784M17.5122 3.62922V7.78755" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.25 17.5L2.5 13.75M2.5 13.75L6.25 10M2.5 13.75H13.75M13.75 2.5L17.5 6.25M17.5 6.25L13.75 10M17.5 6.25H6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WaaSIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M1.875 12.5002C1.875 13.4947 2.27009 14.4486 2.97335 15.1518C3.67661 15.8551 4.63044 16.2502 5.625 16.2502H15C15.7315 16.251 16.4401 15.9951 17.0024 15.5272C17.5647 15.0592 17.945 14.4088 18.077 13.6893C18.2091 12.9698 18.0846 12.2268 17.7251 11.5897C17.3657 10.9526 16.7941 10.4617 16.11 10.2027C16.2646 9.76287 16.2932 9.28859 16.1925 8.8334C16.0918 8.37821 15.8658 7.96024 15.5401 7.62671C15.2144 7.29318 14.8019 7.05738 14.3492 6.94593C13.8965 6.83448 13.4217 6.85183 12.9783 6.99601C12.6916 5.89603 11.988 4.95084 11.0165 4.36061C10.045 3.77037 8.88189 3.58143 7.77351 3.83381C6.66514 4.08618 5.69851 4.76004 5.07832 5.71269C4.45813 6.66535 4.23308 7.82199 4.45083 8.93768C3.70132 9.18505 3.04891 9.66251 2.58645 10.3021C2.12399 10.9417 1.87503 11.7109 1.875 12.5002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RaaSIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.3575 8.125L1.875 10L5.3575 11.875M5.3575 8.125L10 10.625L14.6425 8.125M5.3575 8.125L1.875 6.25L10 1.875L18.125 6.25L14.6425 8.125M5.3575 11.875L1.875 13.75L10 18.125L18.125 13.75L14.6425 11.875M5.3575 11.875L10 14.375L14.6425 11.875M14.6425 8.125L18.125 10L14.6425 11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WebIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 17.5C11.6625 17.4999 13.2779 16.9477 14.5925 15.93C15.9072 14.9124 16.8466 13.4869 17.2633 11.8775M10 17.5C8.33751 17.4999 6.72212 16.9477 5.40748 15.93C4.09284 14.9124 3.1534 13.4869 2.73667 11.8775M10 17.5C12.0708 17.5 13.75 14.1417 13.75 10C13.75 5.85833 12.0708 2.5 10 2.5M10 17.5C7.92917 17.5 6.25 14.1417 6.25 10C6.25 5.85833 7.92917 2.5 10 2.5M17.2633 11.8775C17.4175 11.2775 17.5 10.6483 17.5 10C17.5021 8.71009 17.1699 7.44166 16.5358 6.31833M17.2633 11.8775C15.041 13.1095 12.541 13.754 10 13.75C7.365 13.75 4.88917 13.0708 2.73667 11.8775M2.73667 11.8775C2.57896 11.2641 2.49944 10.6333 2.5 10C2.5 8.6625 2.85 7.40583 3.46417 6.31833M10 2.5C11.3302 2.49945 12.6366 2.8528 13.7852 3.5238C14.9337 4.19481 15.8831 5.15931 16.5358 6.31833M10 2.5C8.6698 2.49945 7.3634 2.8528 6.21484 3.5238C5.06628 4.19481 4.11692 5.15931 3.46417 6.31833M16.5358 6.31833C14.7214 7.88994 12.4004 8.75345 10 8.75C7.50167 8.75 5.21667 7.83333 3.46417 6.31833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AIIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5.83398 11.666C4.45328 11.666 3.33398 12.7853 3.33398 14.166C3.33398 15.5468 4.45328 16.666 5.83398 16.666C6.12618 16.666 6.40667 16.6158 6.66732 16.5238" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.55258 13.0043C2.43623 12.4656 1.66602 11.323 1.66602 10.0005C1.66602 8.99071 2.11496 8.08588 2.82413 7.47461" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.85044 7.40618C2.62908 7.07526 2.5 6.67737 2.5 6.24935C2.5 5.09876 3.43274 4.16602 4.58333 4.16602C5.05243 4.16602 5.48531 4.32105 5.83353 4.58268" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.03206 4.63712C5.90502 4.36781 5.83398 4.06687 5.83398 3.74935C5.83398 2.59876 6.76673 1.66602 7.91732 1.66602C9.0679 1.66602 10.0007 2.59876 10.0007 3.74935V16.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66602 16.666C6.66602 17.5865 7.41221 18.3327 8.33268 18.3327C9.25318 18.3327 9.99935 17.5865 9.99935 16.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 5.83398C10 7.21469 11.1192 8.33398 12.5 8.33398" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.1673 11.666C15.5481 11.666 16.6673 12.7853 16.6673 14.166C16.6673 15.5468 15.5481 16.666 14.1673 16.666C13.8752 16.666 13.5947 16.6158 13.334 16.5238" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.4473 13.0043C17.5636 12.4656 18.3338 11.323 18.3338 10.0005C18.3338 8.99071 17.8849 8.08588 17.1757 7.47461" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.1491 7.40618C17.3704 7.07526 17.4995 6.67737 17.4995 6.24935C17.4995 5.09876 16.5668 4.16602 15.4162 4.16602C14.9471 4.16602 14.5142 4.32105 14.166 4.58268" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 3.74935C10 2.59876 10.9327 1.66602 12.0833 1.66602C13.2339 1.66602 14.1667 2.59876 14.1667 3.74935C14.1667 4.06687 14.0957 4.36781 13.9686 4.63712" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 16.666C13.3333 17.5865 12.5872 18.3327 11.6667 18.3327C10.7462 18.3327 10 17.5865 10 16.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Products dropdown SVG icons ─── */
function OffchainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M14.5834 15.8333H7.50005C6.41827 15.833 5.35788 15.5319 4.43737 14.9637C3.51685 14.3954 2.77249 13.5824 2.28744 12.6155C1.8024 11.6485 1.5958 10.5658 1.69071 9.48814C1.78563 8.41054 2.17833 7.38055 2.82492 6.51328C3.47152 5.64601 4.34655 4.97562 5.35222 4.57703C6.35789 4.17844 7.45459 4.06735 8.51976 4.25618C9.58493 4.44501 10.5766 4.92631 11.384 5.6463C12.1914 6.36629 12.7826 7.29661 13.0917 8.33329H14.5834C15.5779 8.33329 16.5318 8.72838 17.235 9.43164C17.9383 10.1349 18.3334 11.0887 18.3334 12.0833C18.3334 13.0779 17.9383 14.0317 17.235 14.7349C16.5318 15.4382 15.5779 15.8333 14.5834 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OnchainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H7.5C7.96024 8.33333 8.33333 7.96024 8.33333 7.5V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6667 2.5H12.5001C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V7.5C11.6667 7.96024 12.0398 8.33333 12.5001 8.33333H16.6667C17.127 8.33333 17.5001 7.96024 17.5001 7.5V3.33333C17.5001 2.8731 17.127 2.5 16.6667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.6667 11.6666H12.5001C12.0398 11.6666 11.6667 12.0397 11.6667 12.5V16.6666C11.6667 17.1269 12.0398 17.5 12.5001 17.5H16.6667C17.127 17.5 17.5001 17.1269 17.5001 16.6666V12.5C17.5001 12.0397 17.127 11.6666 16.6667 11.6666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 11.6666H3.33333C2.8731 11.6666 2.5 12.0397 2.5 12.5V16.6666C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6666V12.5C8.33333 12.0397 7.96024 11.6666 7.5 11.6666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 5.5C10.6 5.5 11.3333 5.5 11.5 5.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 15C10.6 15 11.3333 15 11.5 15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 11.5C5 9.9 5 9.16667 5 9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 11.5C15 9.9 15 9.16667 15 9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SDKIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6.66667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V8.33333C4.16667 8.77536 3.99107 9.19928 3.67851 9.51184C3.36595 9.8244 2.94203 10 2.5 10C2.94203 10 3.36595 10.1756 3.67851 10.4882C3.99107 10.8007 4.16667 11.2246 4.16667 11.6667V15.8333C4.16667 16.75 4.91667 17.5 5.83333 17.5H6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 17.5H14.1666C14.6086 17.5 15.0325 17.3244 15.3451 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V11.6667C15.8333 10.75 16.5833 10 17.4999 10C17.0579 10 16.634 9.8244 16.3214 9.51184C16.0088 9.19928 15.8333 8.77536 15.8333 8.33333V4.16667C15.8333 3.72464 15.6577 3.30072 15.3451 2.98816C15.0325 2.67559 14.6086 2.5 14.1666 2.5H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WidgetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5V16.6667C10 16.8877 9.9122 17.0996 9.75592 17.2559C9.59964 17.4122 9.38768 17.5 9.16667 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V9.16667C17.5 9.38768 17.4122 9.59964 17.2559 9.75592C17.0996 9.9122 16.8877 10 16.6667 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.4141 12.4697V18.1266" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5856 15.2982H18.2425" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SubpagesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_subpages)">
        <path d="M10.8333 11.45C10.58 11.5963 10.2926 11.6733 10 11.6733C9.70745 11.6733 9.42004 11.5963 9.16668 11.45L2.08335 7.39166C1.9551 7.31898 1.84842 7.21358 1.77421 7.08621C1.69999 6.95884 1.66089 6.81407 1.66089 6.66666C1.66089 6.51925 1.69999 6.37447 1.77421 6.24711C1.84842 6.11974 1.9551 6.01434 2.08335 5.94166L9.16668 1.88333C9.42004 1.73704 9.70745 1.66003 10 1.66003C10.2926 1.66003 10.58 1.73704 10.8333 1.88333L17.9167 5.94166C18.0449 6.01434 18.1516 6.11974 18.2258 6.24711C18.3 6.37447 18.3391 6.51925 18.3391 6.66666C18.3391 6.81407 18.3 6.95884 18.2258 7.08621C18.1516 7.21358 18.0449 7.31898 17.9167 7.39166L10.8333 11.45Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 11.9042L17.9167 12.6083C18.0449 12.681 18.1516 12.7864 18.2258 12.9138C18.3 13.0412 18.3391 13.1859 18.3391 13.3333C18.3391 13.4808 18.3 13.6255 18.2258 13.7529C18.1516 13.8803 18.0449 13.9857 17.9167 14.0583L10.8333 18.1167C10.58 18.263 10.2926 18.34 10 18.34C9.70745 18.34 9.42004 18.263 9.16668 18.1167L2.08335 14.0583C1.9551 13.9857 1.84842 13.8803 1.77421 13.7529C1.69999 13.6255 1.66089 13.4808 1.66089 13.3333C1.66089 13.1859 1.69999 13.0412 1.77421 12.9138C1.84842 12.7864 1.9551 12.681 2.08335 12.6083L3.33335 11.9042" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_subpages">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function ResolvioIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.3334 10C18.3334 9.5398 17.9603 9.16671 17.5001 9.16671C17.0398 9.16671 16.6667 9.5398 16.6667 10C16.6667 10.4603 17.0398 10.8334 17.5001 10.8334C17.9603 10.8334 18.3334 10.4603 18.3334 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 10C8.89071 10 9.78643 3 2.61286 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 10C8.89071 10 9.78643 12.33 2.61286 12.33H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 7.66992H2.61286C9.79429 7.66992 8.89071 9.99992 13 9.99992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17H2.61286C9.79429 17 8.89071 10 13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ENSMCPIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 5.83333C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H15.8333C16.7538 4.16667 17.5 4.91286 17.5 5.83333V14.1667C17.5 15.0871 16.7538 15.8333 15.8333 15.8333H4.16667C3.24619 15.8333 2.5 15.0871 2.5 14.1667V5.83333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 8.33333L9.16667 10.8333L6.66667 13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.8333 13.3333H13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CustomSolutionsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 6.66663C17.4997 6.37435 17.4225 6.0873 17.2763 5.83426C17.13 5.58122 16.9198 5.37109 16.6667 5.22496L10.8333 1.89163C10.58 1.74535 10.2926 1.66833 10 1.66833C9.70744 1.66833 9.42003 1.74535 9.16667 1.89163L3.33333 5.22496C3.08022 5.37109 2.86998 5.58122 2.72372 5.83426C2.57745 6.0873 2.5003 6.37435 2.5 6.66663V13.3333C2.5003 13.6256 2.57745 13.9126 2.72372 14.1657C2.86998 14.4187 3.08022 14.6288 3.33333 14.775L9.16667 18.1083C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1083L16.6667 14.775C16.9198 14.6288 17.13 14.4187 17.2763 14.1657C17.4225 13.9126 17.4997 13.6256 17.5 13.3333V6.66663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.75 5.83337L10 10L17.25 5.83337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 18.3333V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Community dropdown SVG icons ─── */
function SubstackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.8333 17.5L9.99996 14.1667L4.16663 17.5V4.16667C4.16663 3.72464 4.34222 3.30072 4.65478 2.98816C4.96734 2.67559 5.39127 2.5 5.83329 2.5H14.1666C14.6087 2.5 15.0326 2.67559 15.3451 2.98816C15.6577 3.30072 15.8333 3.72464 15.8333 4.16667V17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XTwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
    </svg>
  );
}

function DiscordNavIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
    </svg>
  );
}

function ENSxAIIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
    </svg>
  );
}

/* ─── Solutions dropdown items ─── */
const SOLUTIONS_ITEMS = [
  { label: "Wallets", icon: <WalletsIcon /> },
  { label: "L2s / Rollups", icon: <RollupsIcon /> },
  { label: "Payment apps", icon: <PaymentIcon /> },
  { label: "WaaS", icon: <WaaSIcon /> },
  { label: "RaaS", icon: <RaaSIcon /> },
  { label: "Decentralized Websites", icon: <WebIcon /> },
  { label: "AI agents", icon: <AIIcon /> },
];

/* ─── Products dropdown items ─── */
const PRODUCTS2_ITEMS = [
  { label: "Offchain Subnames", href: "#offchain-subnames", icon: <OffchainIcon /> },
  { label: "Onchain Subnames", href: "#onchain-subnames", icon: <OnchainIcon /> },
  { label: "SDK / API", href: "#sdk-api", icon: <SDKIcon /> },
  { label: "ENS Widget", href: "#ens-widget", icon: <WidgetIcon /> },
  { label: "Subpages", href: "#subpages", icon: <SubpagesIcon /> },
  { label: "Resolvio", href: "#resolvio", icon: <ResolvioIcon /> },
  { label: "ENS MCP", href: "https://github.com/thenamespace/ens-mcp", external: true, icon: <ENSMCPIcon /> },
  { label: "Custom Solutions", href: "#", icon: <CustomSolutionsIcon /> },
];

const COMMUNITY_ITEMS = [
  { label: "Substack", href: "https://thenamespace.substack.com/", icon: <SubstackIcon /> },
  { label: "X (Twitter)", href: "https://x.com/namespace_eth", icon: <XTwitterIcon /> },
  { label: "Telegram", href: "https://t.me/+BJMGddUg8hk4MDEy", icon: <TelegramIcon /> },
  { label: "Discord", href: "https://discord.gg/FR7fngrA4s", icon: <DiscordNavIcon /> },
  { label: "ENS x AI group", href: "https://t.me/ensxai", icon: <ENSxAIIcon /> },
];

/**
 * Navbar — pixel-perfect port of the Webflow navbar2_component.
 *
 * We use Webflow CSS classes for layout/styling. The dropdown open/close
 * and mobile menu are React-controlled to avoid hydration conflicts
 * with the Webflow JS runtime.
 *
 * We strip `data-w-id` from nav elements so Webflow JS doesn't double-bind.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      data-animation="default"
      className="navbar2_component w-nav"
      data-easing2="ease"
      fs-scrolldisable-element="smart-nav"
      data-easing="ease"
      data-collapse="medium"
      role="banner"
      data-duration="400"
    >
      <div className="navbar2_container">
        {/* Logo */}
        <a href="/" aria-current="page" className="navbar2_logo-link w-nav-brand w--current">
          <div className="navbar2_logo w-embed">
            <NamespaceLogo />
          </div>
        </a>

        {/* Desktop nav */}
        <nav role="navigation" className="navbar2_menu is-page-height-tablet w-nav-menu">
          {/* Solutions dropdown */}
          <div data-delay="200" data-hover="true" className="navbar2_menu-dropdown w-dropdown">
            <div className="navbar_dropdwn-toggle w-dropdown-toggle">
              <div>Solutions</div>
            </div>
            <nav className="navbar_dropdown-list w-dropdown-list">
              {SOLUTIONS_ITEMS.map((item) => (
                <div key={item.label} className="navbar_dropdown-link">
                  <NavIcon>{item.icon}</NavIcon>
                  <div>{item.label}</div>
                </div>
              ))}
            </nav>
          </div>

          {/* Products dropdown */}
          <div data-delay="200" data-hover="true" className="navbar2_menu-dropdown w-dropdown">
            <div className="navbar_dropdwn-toggle w-dropdown-toggle">
              <div>Products</div>
            </div>
            <nav className="navbar_dropdown-list w-dropdown-list">
              {PRODUCTS2_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="navbar_dropdown-link w-inline-block"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <NavIcon>{item.icon}</NavIcon>
                  <div>{item.label}</div>
                </a>
              ))}
            </nav>
          </div>

          {/* Community dropdown */}
          <div data-delay="200" data-hover="true" className="navbar2_menu-dropdown w-dropdown">
            <div className="navbar_dropdwn-toggle w-dropdown-toggle">
              <div>Community</div>
            </div>
            <nav className="navbar_dropdown-list w-dropdown-list">
              {COMMUNITY_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar_dropdown-link w-inline-block"
                >
                  <NavIcon>{item.icon}</NavIcon>
                  <div>{item.label}</div>
                </a>
              ))}
            </nav>
          </div>

          {/* Blog link */}
          <a href="/blog" className="navbar_link w-nav-link">Blog</a>

          {/* Mobile CTA */}
          <div className="margin-top margin-xxsmall show-tablet">
            <WfButton href="https://app.namespace.ninja" label="Go to App" />
          </div>
        </nav>

        {/* Desktop CTA + mobile hamburger */}
        <div className="navbar2_button-wrapper">
          <div className="hide-tablet">
            <WfButton href="https://app.namespace.ninja" label="Go to App" />
          </div>
          <div
            className="navbar2_menu-button w-nav-button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="menu-icon">
              <div className="menu-icon2_line-top" />
              <div className="menu-icon2_line-middle">
                <div className="menu-icon2_line-middle-inner" />
              </div>
              <div className="menu-icon2_line-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
