//
//  RecurringAppDelegate.h
//  Recurring
//
//  Created by Greg Allen on 1/27/11.
//  Copyright DemandMedia 2011. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PhoneGapDelegate.h"
#import "ApplicationStatus.h"

@interface RecurringAppDelegate : PhoneGapDelegate {
	ApplicationStatus *_applicationStatus;
}

@end

