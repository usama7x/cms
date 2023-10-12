import { Injectable } from '@nestjs/common';
// import { CreateStockHistoryInput } from './dto/create-stock-history.input';
// import { UpdateStockHistoryInput } from './dto/update-stock-history.input';

@Injectable()
export class StockHistoryService {
  // create(createStockHistoryInput: CreateStockHistoryInput) {
  //   return 'This action adds a new stockHistory';
  // }

  findAll() {
    return `This action returns all stockHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockHistory`;
  }

  // update(id: number, updateStockHistoryInput: UpdateStockHistoryInput) {
  //   return `This action updates a #${id} stockHistory`;
  // }

  remove(id: number) {
    return `This action removes a #${id} stockHistory`;
  }
}
