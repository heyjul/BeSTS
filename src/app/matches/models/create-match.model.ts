export interface CreateOrUpdateMatch {
    id?: string;
    teamOneId: string;
    teamTwoId: string;
    startDate: Date;
    winnerPoints: number;
    guessPoints: number;
    roomId: string;
}