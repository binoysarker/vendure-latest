import { SmsService } from '../smsService';
import { CustomOrderProcess } from "@vendure/core";


export const expressDeliverySelectedNotificationProcess: CustomOrderProcess<'ExpressDeliverySelectedNotificationProcess'> = {
    
    transitions: {
        AddingItems: {
            to: ['ExpressDeliverySelectedNotificationProcess'],
            mergeStrategy: 'replace'
        },
        ExpressDeliverySelectedNotificationProcess: {
            to: ['ArrangingPayment', 'AddingItems'],
        },
    },
    
    onTransitionStart(fromState, toState, data) {
        
        
        if (fromState === 'ExpressDeliverySelectedNotificationProcess' && toState === 'ArrangingPayment') {  
            const smsService = new SmsService(`Your order ID is ${data.order.code}, your bill value is Rs.${data.order.totalWithTax}.you will get delivery within 1hour time. Thank your for ordering to us.By KAAIKANI`,data.order.customer!.phoneNumber);          
            smsService.sendSms();
        }
    }
}