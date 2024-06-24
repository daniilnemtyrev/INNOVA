import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';

import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {

constructor(private taskServise: TasksService){
}

@Delete(':id')
  deleteTaskById(@Param('id') id: number) {
    this.taskServise.deleteTaskById(id)
}


@Post('/createTask')
create(@Body() taskDto:CreateTaskDto){
    return this.taskServise.createTask(taskDto)
}

@Get()
getAllTasks(){
return this.taskServise.getAllTasks()
}

@Get(':id')
getTasksByProjectId(@Param('id') id:number ){
return this.taskServise.getTasksByProjectId(id)
}



}
