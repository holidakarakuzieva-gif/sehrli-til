export type Lang = 'uz' | 'ru' | 'en';

export type PartOfSpeech =
  | 'ot'
  | 'sifat'
  | 'fel'
  | 'son'
  | 'olmosh'
  | 'ravish'
  | 'undov'
  | 'ibora';

export interface Word {
  id: string;
  uz: string;
  ru: string;
  en: string;
  pos: PartOfSpeech;
  emoji: string;
  image?: string;
  pronunciationRu: string;
  example: Record<Lang, string>;
  synonyms?: string[];
  antonyms?: string[];
  family?: string[];
  memoryTip?: Partial<Record<'ru' | 'en', string>>;
  tags: string[];
}

export type Exercise =
  | {
      id: string;
      type: 'choice';
      prompt: Record<Lang, string>;
      options: { id: string; text: string; emoji?: string }[];
      correctId: string;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'fill-blank';
      prompt: Record<Lang, string>;
      sentenceBefore: string;
      sentenceAfter: string;
      answer: string;
      choices?: string[];
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'match';
      prompt: Record<Lang, string>;
      pairs: { left: string; right: string; emoji?: string }[];
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'sentence-order';
      prompt: Record<Lang, string>;
      words: string[];
      correctOrder: string[];
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'true-false';
      prompt: Record<Lang, string>;
      statementUz: string;
      isTrue: boolean;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'fix-spelling';
      prompt: Record<Lang, string>;
      sentenceTokens: string[];
      wrongIndex: number;
      correctedWord: string;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'listen-pick';
      prompt: Record<Lang, string>;
      wordId: string;
      uzWord: string;
      pronunciationRu: string;
      options: { id: string; text: string; emoji?: string }[];
      correctId: string;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'type-word';
      prompt: Record<Lang, string>;
      emoji: string;
      answer: string;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'odd-one-out';
      prompt: Record<Lang, string>;
      items: { id: string; uz: string; label: Record<Lang, string>; emoji: string }[];
      oddId: string;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    }
  | {
      id: string;
      type: 'suffix-train';
      prompt: Record<Lang, string>;
      root: string;
      suffixes: string[];
      correctOrder: string[];
      meaning: Record<Lang, string>;
      hint: Record<Lang, string>;
      explanation: Record<Lang, string>;
    };

export interface Unit {
  id: string;
  grade: 2 | 3;
  order: number;
  title: Record<Lang, string>;
  icon: string;
  color: 'sunny' | 'sky' | 'mint' | 'grape' | 'berry' | 'lemon';
  words: Word[];
  lecture: Record<Lang, string[]>;
  magicKey: {
    rule: Record<Lang, string>;
    examples: { uz: string; ru: string; en: string }[];
  };
  dialog: {
    speaker: 'Anvar' | 'Katya' | 'Humocha' | 'Ustoz' | 'Onam' | 'Sotuvchi';
    uz: string;
    ru: string;
    en: string;
  }[];
  exercises: Exercise[];
  riddleIds: string[];
  storyId?: string;
  homeTask: Record<Lang, string>;
  tprCommands: { uz: string; ru: string; en: string; emoji: string }[];
}

export interface UnitSummary {
  id: string;
  grade: 2 | 3;
  order: number;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  icon: string;
  color: 'sunny' | 'sky' | 'mint' | 'grape' | 'berry' | 'lemon';
  wordCountTarget: number;
}
