export interface Property {
    name: string; 
    building: string,
    unit: string,
    bedrooms: Bedroom[];
    isActive: Boolean,
    address: {
        apartment_num: string,
        street: string,
        city: string,
        state: string,
        zip: string,
      },
    effective_date: Date,
    end_date: Date,
    floor_plan: Number,
    max_occupancy: Number,
    comments: string,
    special_instructions: Instruction[],
    rating: string,
    bathrooms: Number,
    owned_by: Owner[],
}

export interface Bedroom {
    bedroom_type: string;  
    bedsize: string;
}

export interface Instruction {
    instruction: string;
}

export interface Owner {
    owner_id: Object
}
