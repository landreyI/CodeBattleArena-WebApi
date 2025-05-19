export interface Player {
    id: string;
    username: string;
    email: string | null;
    photoUrl: string | null;
    roles: string[] | null;
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
    timePlay: number | null; //minutes

    taskId: number | null;
    taskProgramming: TaskProgramming | null;

    winnerId: string | null;
    creatorId: string;
    password: string | null;
    dateCreating: Date;
    dateStartGame: Date | null;
    isStart: boolean;
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
    finishTask: Date | null;
    isCompleted: boolean;
}

export interface TaskProgramming {
    idTaskProgramming: number | null;
    name: string;

    langProgrammingId: number;
    langProgramming: LangProgramming | null;

    difficulty: Difficulty;
    textTask: string;
    preparation: string;
    verificationCode: string;

    taskInputData: TaskInputData[] | null;
}

export interface TaskInputData {
    idTaskProgramming: number | null;

    answer: string;

    idInputDataTask: number | null;
    inputData: InputData | null;
}

export interface InputData {
    idInputData: number | null;
    data: string;
}

export interface LangProgramming {
    idLang: number;
    codeNameLang: string;
    nameLang: string;
    idCheckApi: string;
}

export interface League {
    idLeague: number | null;
    name: string;
    minWins: number;
    maxWins: number | null;
}

export interface LeaguePlayers {
    league?: League;
    players?: Player[];
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
export enum LeagueEnum {
    Bronze = "Bronze",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum",
    Diamond = "Diamond"
}