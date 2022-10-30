import { Match } from "src/app/shared/models/match.model";

export interface FullRoom {
    id: string,
    name: string;
    description?: string;
    ownerId: String,
    matches: Match[];
}