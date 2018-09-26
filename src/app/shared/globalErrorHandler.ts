import {ErrorHandler}from '@angular/core';
class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error occurred.');
    }
  }