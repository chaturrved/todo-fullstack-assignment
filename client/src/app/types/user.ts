import { Task } from "./task";

export type User = {
    id: String;
    name? : String;
    role?: "ADMIN" | "USER";
    email: String;
    tasks?: Task[];
}