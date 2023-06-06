    export interface Rental {
        id?: string;
        memberId: string;
        bookId: string;
        date: string;
        isReturn: number;
        bookCover?: string|"";
        rentalLabel?: string|"";
  }