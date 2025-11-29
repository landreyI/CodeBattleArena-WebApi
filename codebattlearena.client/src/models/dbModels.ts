export interface Player {
    id: string;
    username: string;
    photoUrl: string | null;
    coin?: number | null;
    experience?: number | null;
    roles: string[] | null;
    victories: number;
    additionalInformation: string | null;
    createdAt: Date;
    countGames: number | null;

    activeBackgroundId?: number;
    activeBackground?: Item | null;

    activeAvatarId?: number;
    activeAvatar?: Item | null;

    activeBadgeId?: number;
    activeBadge?: Item | null;

    activeBorderId?: number;
    activeBorder?: Item | null;

    activeTitleId?: number;
    activeTitle?: Item | null;
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

    isGeneratedAI: boolean;

    idPlayer?: string | null;
    player?: Player | null;

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
    photoUrl?: string;
    minWins: number;
    maxWins: number | null;
}

export interface Friend {
    idFriend?: number | null;
    requesterId: string;
    requester?: Player | null;
    addresseeId: string;
    addressee?: Player | null;
    isFriendship: boolean;
    friendshipDate?: Date;
}

export interface Chat {
    idChat: number | null;
    idPlayer1: string;
    player1: Player | null;
    idPlayer2: string;
    player2: Player | null;
}

export interface Message {
    idMessage: number | null;
    idChat: number | null;
    chat: Chat | null
    idSender: string | null;
    sender: Player | null;
    messageText: string;
}

export interface Item {
    idItem: number | null;
    name: string;
    type: TypeItem;
    priceCoin: number | null;
    cssClass: string | null;
    imageUrl: string | null;
    description: string | null;
}

export interface PlayerItem {
    idPlayer: string;
    player: Player | null;
    idItem: number;
    item: Item | null;
}

export interface Reward {
    idReward: number | null;
    itemId: number | null;
    item: Item | null;
    amount: number | null;
    rewardType: string;
}

export interface TaskPlay {
    idTask?: number | null;
    name: string;
    description: string;
    type: TaskType;
    experience: number | null;
    rewardCoin: number | null;
    isRepeatable: boolean;
    repeatAfterDays?: number | null;
    taskPlayParams: TaskPlayParam[] | null;
}

export interface TaskPlayParam {
    idParam?: number | null;
    taskPlayId?: number | null;
    paramKey: TaskParamKey;
    paramValue: string;
    isPrimary?: boolean;
}

export interface TaskPlayReward {
    taskPlayId: number;
    taskPlay: TaskPlay | null;
    rewardId: number;
    reward: Reward | null;
}

export interface PlayerTaskPlay {
    idPlayerTaskPlay: number | null;
    playerId: string;
    player: Player | null;
    taskPlayId: number;
    taskPlay: TaskPlay | null;
    isCompleted: boolean;
    completedAt?: Date | null;
    isGet: boolean;
    progressValue: string | null;
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
export enum TypeItem {
    Background = "Background",
    Avatar = "Avatar",
    Badge = "Badge",
    Border = "Border",
    Title = "Title",
}
export enum TaskType {
    WinCount = "WinCount",
    Login = "Login",
    DailyMatch = "DailyMatch",
    LeagueAdvance = "LeagueAdvance",
}
export enum TaskParamKey {
    MinWins = "MinWins",                    // Минимум побед для выполнения
    ResetOnLoss = "ResetOnLoss",            // Сброс прогресса при поражении
    RequiredLeague = "RequiredLeague",      // Переход в нужную лигу
    RequiredId = "RequiredId",              // На случай, если название будет изменяться
    MatchesPerDay = "MatchesPerDay",        // Матчей в день для прогресса
    DaysInRow = "DaysInRow",                // Кол-во дней подряд
    LoginRequired = "LoginRequired",        // Зайти в игру
}