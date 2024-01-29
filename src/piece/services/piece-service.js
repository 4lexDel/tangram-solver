import { SharedService } from '../../shared/services/shared-service.js';

export class PieceService {
    constructor() {
        this.sharedService = new SharedService();

        this.data = [{
                "data": [
                    [false, false, true, false, false],
                    [false, false, true, false, false],
                    [false, false, true, false, false],
                    [false, false, true, false, false],
                    [false, false, true, false, false]
                ],
                "label": "Line"
            },
            {
                "data": [
                    [false, true, false, false, false],
                    [false, true, false, false, false],
                    [false, true, false, false, false],
                    [false, true, true, false, false],
                    [false, false, false, false, false]
                ],
                "label": "The 'L'"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [false, true, true, true, false],
                    [false, false, true, false, false],
                    [false, false, false, false, false]
                ],
                "label": "Cross"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, true, true, false],
                    [false, true, true, false, false],
                    [false, true, false, false, false],
                    [false, false, false, false, false]
                ],
                "label": "Zig zag"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [false, true, true, false, false],
                    [false, true, false, false, false],
                    [false, true, false, false, false]
                ],
                "label": "Break line"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [false, true, true, true, false],
                    [false, true, false, false, false],
                    [false, false, false, false, false]
                ],
                "label": "Break cross"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, true, false, true, false],
                    [false, true, true, true, false],
                    [false, false, false, false, false]
                ],
                "label": "The 'U'"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, true, true, false],
                    [false, false, true, false, false],
                    [false, true, true, false, false],
                    [false, false, false, false, false]
                ],
                "label": "The 'S'"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, true, true, false],
                    [false, true, true, true, false],
                    [false, false, false, false, false]
                ],
                "label": "Truck"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, true, true, true, false],
                    [false, false, true, false, false],
                    [false, false, true, false, false],
                    [false, false, false, false, false]
                ],
                "label": "The 'T'"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, true, false, false, false],
                    [false, true, false, false, false],
                    [false, true, true, true, false],
                    [false, false, false, false, false]
                ],
                "label": "Corner"
            },
            {
                "data": [
                    [false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [true, true, true, true, false],
                    [false, false, false, false, false]
                ],
                "label": "Boat"
            }
        ]
    }

    get pieceList() {
        return this.sharedService.cloneNDArray(this.data);
    }
}