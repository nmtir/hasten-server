import { RolesGuard } from './../../roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnum } from './../../roles/roles.enum';
import { Roles } from './../../roles/roles.decorator';
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
  Res,
} from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@ApiTags('Maps')
@Controller({
  path: 'maps',
  version: '1',
})
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  findAll() {
    return this.mapService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.mapService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createMapDto: any) {
    return this.mapService.create(createMapDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateMapDto: any) {
    return this.mapService.update(id, updateMapDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mapService.remove(id);
  }
}
