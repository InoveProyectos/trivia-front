import React, { ChangeEvent } from "react";

export interface intInput extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface intSimpleButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export interface intTimmer {
  initialTime: number;
}

export interface intPoints {
  points?: number | null;
}

export interface intStatement {
  ask?: string;
  remember?: string;
}

export interface intAnswerCom {
  ansSelected?: number;
  ans: intAnswerOptions;
  onSelected?: (num?: number) => void;
  disable: boolean | undefined;
  correctAnswer?: number;
}

export interface intUseTriviaHook {
  isLoading: boolean;
  response?: any;
  error?: any;
}

export interface intTrivia {
  id?: number;
  name?: string;
  description?: string;
  moderated?: boolean | null;
  end_date?: string;
}

export interface intRoomData {
  roomCode?: number | null | undefined;
}

export interface btnBegin {
  handleClick?: () => Promise<void>;
}

export interface intUser {
  username?: string;
  name?: string;
  is_staff?: false | null;
  role?: string;
  score?: number | null;
  bonus?: number | null;
}

export interface intAnswer {
  name?: string;
  description: string;
  options: Array<intAnswerOptions>;
}

export interface intAnswerOptions {
  index?: number;
  content?: string;
}

export interface resCall {
  status: number;
  messaje: string;
  res?: any;
}

export interface infoChallengeChart {
  opciones: string[];
  respuestas: number[];
}
