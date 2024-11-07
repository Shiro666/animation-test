interface AnimationInfo {
    fn: (time?: number) => void;
    id: string;
    pause?: boolean;
}

export default class AnimationManager {
    private list: AnimationInfo[] = [];

    public add = (ani: AnimationInfo) => {
        this.list.push(ani);
    };

    public remove = (id: string) => {
        const newList = this.list.filter((item) => {
            return item.id !== id;
        });
        this.list = newList;
    };

    public pause = (id: string) => {
        const index = this.list.findIndex((item) => item.id === id);
        this.list[index].pause = true;
    }
}
