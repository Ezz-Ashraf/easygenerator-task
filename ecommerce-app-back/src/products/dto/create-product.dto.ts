import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: String;
    @ApiProperty()
    price: Number;
    @ApiProperty()
    availablePieces: Number;
}
