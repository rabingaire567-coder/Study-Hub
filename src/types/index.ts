export type Province = {
  id: number;
  name: string;
  nameNepali: string;
  code: string;
  capital: string;
  districts: District[];
  region: 'Mountain' | 'Hill' | 'Terai';
};

export type District = {
  id: number;
  name: string;
  nameNepali: string;
  provinceId: number;
  headquarter: string;
  population?: number;
  areaKm2?: number;
  literacy?: number;
};

export type Location = {
  province: Province;
  district?: District;
};

export type LearningResource = {
  id: string;
  title: string;
  description: string;
  category: 'primary' | 'secondary' | 'higher' | 'vocational' | 'digital' | 'inclusive';
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'nepali' | 'english' | 'mixed';
  url?: string;
  tags: string[];
  province?: number[];
  district?: number[];
  offline: boolean;
};

export type ProblemSolution = {
  id: string;
  problem: string;
  problemNepali?: string;
  solution: string;
  solutionNepali?: string;
  category: 'access' | 'infrastructure' | 'language' | 'gender' | 'disability' | 'digital' | 'teacher' | 'economic';
  priority: 'high' | 'medium' | 'low';
  region: ('Mountain' | 'Hill' | 'Terai')[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};