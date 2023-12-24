// This  defines a constructor function . It takes in two parameters: message and statusCode. The super(message) calls the constructor of the parent class with the message parameter , and it get massage  data from  it but get statusCode from that . The this.statusCode = statusCode assigns the value of the statusCode parameter to the statusCode property of the current object.


class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // hear use super mean access parent class . mean real world --> i use it on  folder utils/ auth.js line 7 hear super mean parent class is this fun so access err massage from  there. 
    super(message);
    // mean received statusCode from ErrorHandler class mean where add this class 
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;

// in summery --> hear to receive err massage by using super() . and receive statusCode by using this.statusCode . massage already exist . but  statusCode like 401  not exit so put statusCode and receive this code use this.statusCode 