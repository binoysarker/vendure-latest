import { SmsService } from '../smsService';
import { CustomOrderProcess } from "@vendure/core";


export const orderCanceledNotificationProcess: CustomOrderProcess<'OrderCanceledNotificationProcess'> = {
    
    
    
    onTransitionStart(fromState, toState, data) {
        console.log(`current state ${fromState} to ${toState}`);
        
        if (toState === 'Cancelled') {
            data.order.payments.forEach(element => {
                
                const smsService = new SmsService(`Your order is cancelled. Your order amount Rs.${element.amount}.Your order Id is ${data.order.code}.Refund amount will credited to your account. Thank you for ordering us.By KAAIKANI`,data.order.customer!.phoneNumber);            
                smsService.sendSms();
            });
        }
    }
}