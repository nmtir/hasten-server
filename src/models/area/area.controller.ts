import { Roles } from './../../roles/roles.decorator';
import { RoleEnum } from './../../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './../../roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Areas')
@Controller({
  path: 'areas',
  version: '1',
})
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.areaService.findById(id);
  }

  @Post()
  create(@Body() createAreaDto: any) {
    return this.areaService.create(createAreaDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAreaDto: any) {
    return this.areaService.update(id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.areaService.remove(id);
  }
}
