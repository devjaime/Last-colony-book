export type RevealStyle = "whisper" | "fracture" | "signal" | "archive";

export type AnimationProfile = "impact" | "biolume" | "surveillance" | "transmission" | "contact";

export type NarrativeSection = {
  text: string;
  revealStyle: RevealStyle;
  soundCue: string;
  parallaxDepth: number;
};

export type Chapter = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  visualTheme: string;
  image: string;
  audio: string;
  accent: string;
  animationProfile: AnimationProfile;
  sections: NarrativeSection[];
};

export type BookPageKind = "cover" | "scene" | "dossier" | "transcript" | "evidence" | "manifesto";

export type NarrativeLink = {
  label: string;
  url: string;
  note?: string;
};

export type BookPage = {
  id: string;
  chapterId: string;
  kind: BookPageKind;
  eyebrow: string;
  title: string;
  body: string[];
  image?: string;
  mediaCaption?: string;
  mediaCredit?: string;
  sourceUrl?: string;
  links?: NarrativeLink[];
  quote?: string;
  evidence?: string[];
};
