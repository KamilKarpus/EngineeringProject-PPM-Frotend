export class AddNewLocation{
    constructor(public name: string,
        public type: number,
        public handleQR: boolean,
        public description: string,
        public height: number,
        public width: number,
        public shortName: string,
        public length: number){}
}