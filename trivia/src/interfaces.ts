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
  points: number;
}

export interface intStatement {
  ask: string;
  remember?: string;
}

export interface intAnswer {
  ans: string;
  onSelected: (num: number) => void;
}

export interface intUseTriviaHook {
  isLoading: boolean;
  response?: any;
  error?: any;
}

export interface intTrivia {
  id: number;
  name: string;
  description: string;
  moderated: boolean;
  end_date: string;
}
