export interface CreateMatch {
    teamOneId: string;
    teamTwoId: string;
    startDate: Date;
    winnerPoints: number;
    guessPoints: number;
    roomId: string;
}