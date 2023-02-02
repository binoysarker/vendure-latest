import { SmsService } from '../smsService';
import { CustomOrderProcess } from "@vendure/core";


export const productDeliveredNotificationProcess: CustomOrderProcess<'ProductDeliveredNotificationProcess'> = {
    
    transitions: {
        Shipped: {
            to: ['ProductDeliveredNotificationProcess'],
            mergeStrategy: 'replace'
        },
        ProductDeliveredNotificationProcess: {
            to: ['Delivered', 'Shipped'],
        },
    },
    
    onTransitionStart(fromState, toState, data) {
        if (fromState === 'ProductDeliveredNotificationProcess' && toState === 'Delivered') { 
            const smsService = new SmsService(`We Delivered your order. Your order Id is ${data.order.code}, your order value is Rs.${data.order.totalWithTax}. Thank you for ordering us. By KAAIKANI`,data.order.customer!.phoneNumber);           
            smsService.sendSms();
        }
    }
}