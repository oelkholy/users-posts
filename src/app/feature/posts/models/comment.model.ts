export interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
    showAllText: boolean // For Frontend
}