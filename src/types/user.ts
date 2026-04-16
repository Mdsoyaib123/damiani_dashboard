export interface User {
    _id: string;
    userId: number;
    score: number;
    phoneNumber: string;
    email?: string;
    role: string;
    password: string;
    invitationCode: string;
    superiorUserId: string;
    superiorUserName: string;
    userDiopsitType: string;
    orderRound: {
        round: string;
        status: boolean;
        _id: string;
    };
    outOfBalance: number;
    freezeUser: boolean;
    freezeWithdraw: boolean;
    quantityOfOrders: number;
    completedOrdersCount: number;
    adminAssaignProductsOrRewards: Array<{
        productId: number;
        orderNumber: number;
        _id: string;
    }>;
    withdrawalAddressAndMethod: {
        _id: string;
        name: string;
        withdrawMethod: "BankTransfer" | "MobileBanking";
        // Bank Transfer fields
        bankName?: string;
        bankAccountNumber?: string | number;
        branchName?: string;
        district?: string;
        // Mobile Banking fields
        mobileBankingName?: string;
        mobileBankingAccountNumber?: string | number;
    } | null;
    withdrowalValidOddNumber: number;
    actualCompletedNumberToday: number;
    userBalance: number;
    memberTotalRecharge: number;
    memberTotalWithdrawal: number;
    userOrderFreezingAmount: number;
    amountFrozedInWithdrawal: number;
    whetherOnline: boolean;
    userType: string;
    lastLoginIp: string;
    userOrderAmountSlot: number[];
    completedOrderProducts: string[];
    isOnline: boolean;
    adminAssaignProducts: Array<{
        productId: number;
        orderNumber: number;
        _id: string;
    }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    name?: string;
    userSelectedPackage?: number;
}