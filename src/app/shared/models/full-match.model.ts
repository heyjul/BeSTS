export interface FullMatch {
    id: string;
    teamOne: string;
    teamTwo: string;
    startDate: Date;
    winnerPoints: number;
    guessPoints: number;
    guessedTeamOneScore?: number;
    guessedTeamTwoScore?: number;
    realTeamOneScore?: number;
    realTeamTwoScore?: number;
}