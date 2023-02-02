import { SmsService } from '../smsService';
import { CustomOrderProcess } from "@vendure/core";


export const deliveryNotificationProcess: CustomOrderProcess<'DeliveryNotificationProcess'> = {
    
    transitions: {
        ArrangingPayment: {
            to: ['DeliveryNotificationProcess'],
            mergeStrategy: 'replace'
        },
        DeliveryNotificationProcess: {
            to: ['PaymentSettled', 'ArrangingPayment'],
        },
    },
    
    onTransitionStart(fromState, toState, data) {

        if (fromState === 'DeliveryNotificationProcess' && toState === 'PaymentSettled') { 
            const smsService = new SmsService(`Your order Id is ${data.order.code}, your bill value is Rs.${data.order.totalWithTax}.you will get delivery on tomorrow 6am to 9am.By KAAIKANI`,data.order.customer!.phoneNumber);
            smsService.sendSms();
        }
    }
}