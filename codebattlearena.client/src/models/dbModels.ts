export interface Player {
    id: string;
    username: string;
    email: string;
    photoUrl: string | null;
    role: string;
    victories: number;
    additionalInformation: string | null;
    createdAt: Date;
}

export interface Session {
    idSession: number | null;
    name: string;

    langProgrammingId: number;
    langProgramming: LangProgramming | null;

    state: SessionState;
    maxPeople: number;
    difficulty: Difficulty;
    taskId: number | null;
    winnerId: string | null;
    creatorId: string;
    password: string | null;
    dateCreating: Date;
    dateStart: Date | null;
    isFinish: boolean;
    amountPeople: number | null;
}

export interface PlayerSession {
    idPlayer: string;
    player: Player | null;
    idSession: number;
    session: Session | null;
    codeText: string | null;
    time: string | null;
    memory: number | null;
    state: boolean;
}
export interface LangProgramming {
    idLang: number;
    codeNameLang: string;
    nameLang: string;
}

export enum SessionState {
    Public = "Public",
    Private = "Private"
}

export enum Role {
    Admin = "Admin",
    User = "User",
    Manager = "Manager",
    Moderator = "Moderator",
    Banned = "Banned"
}

export enum Difficulty {
    Hard = "Hard",
    Medium = "Medium",
    Easy = "Easy"
}