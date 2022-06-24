import { Controller, Get, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO, CreateTodoResponseDTO } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {


    constructor(private readonly todoService: TodoService) { }

    @Get()
    async index(): Promise<CreateTodoResponseDTO> {
        try {
            return {
                status: 'success',
                code: HttpStatus.OK,
                errors: null,
                result: await this.todoService.findAll()
            }
        } catch (err) {
            return {
                status: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                errors: err,
                result: null
            }
        }
    }

    // @Get()
    // async index() {
    //     return await this.todoService.findAll();
    // }



    @Get(':id')
    async find(@Param('id') id: string) {
        return this.todoService.findOne(id);
    }

    @Post()
    async create(@Body() todo: CreateTodoDTO) {
        return this.todoService.create(todo);
    }
}
