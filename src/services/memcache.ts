export class MemCahche {
  private static instance: MemCahche;
  private board: Record<string, string> = {};

  private constructor() {}
  public static getInstance(): MemCahche {
    if (!MemCahche.instance) {
      MemCahche.instance = new MemCahche();
    }

    return MemCahche.instance;
  }

  public hasUser(roomId: string) {
    return this.board[roomId];
  }
  public assignClientToRoom(roomId: string, clientId: string) {
    this.board[roomId] = clientId;
  }

  public moveClientFromRoom(clientId: string) {
    for (let key in this.board) {
      let value = this.board[key];
      if (value === clientId) {
        delete this.board[key];
        return key;
      }
    }
  }
}
