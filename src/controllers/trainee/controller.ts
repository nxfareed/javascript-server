import { Request, Response } from 'express';

class TraineeController {
static instance: TraineeController;
static getInstance = () => {
if (TraineeController.instance) {
return TraineeController.instance;
}
TraineeController.instance = new TraineeController();
return TraineeController.instance;
}

create = (req: Request, res: Response) => {
console.log(' :::::::::: Inside Create Trainee :::::::: ');
res.send({
status: 'OK',
message: 'Trainee added successfully',
data: {
id: 231,
name: 'Shiva Sharma',
address: 'Noida'
}
});
};

list = (req: Request, res: Response) => {
console.log(' :::::::::: Inside List Trainee :::::::: ');
res.send({
status: 'OK',
message: 'All trainees',
data: [{
id: 231,
name: 'Shiva Sharma',
address: 'Noida'
},
{
id: 229,
name: 'Vibhor Garg',
address: 'Noida'
},
{
id: 232,
name: 'Fareed',
address: 'Noida'
}]
});
};
update = (req: Request, res: Response) => {
console.log(' :::::::::: Inside Update Trainee :::::::: ');
res.send({
status: 'OK',
message: 'Trainee updated successfully',
data: {
id: 231,
name: 'Shiva Sharma',
address: 'Noida'
}
});
};
delete = (req: Request, res: Response) => {
console.log(' :::::::::: Inside Delete Trainee :::::::: ');
res.send({
status: 'OK',
message: 'Trainee deleted successfully',
data: {
id: 231,
name: 'Shiva Sharma',
address: 'Noida'
}
});
};
}

export default TraineeController.getInstance();