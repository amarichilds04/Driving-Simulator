let loggedIn = false;
let currentAccount = null;
let accountMode = 'signin';
let scorePromptShown = false;
let currentCardIndex = 0;
let cardIsFlipped = false;
let lastQuizScore = null;
let pageAfterLogin = 'home';
let currentQuestion = null;
let lastQuestionId = null;
let questionToPractice = null;
let totalAnswered = 0;
let totalCorrect = 0;
let quizFinished = false;




const questionBank = [
    {
        id: 'railroad-crossing-no-gates',
        question: 'When you approach a railroad crossing without flashing warning signals or crossing gates, you should:',
        options: [
            { value: 'a', text: 'cross the tracks as quickly as possible.' },
            { value: 'b', text: 'always stop.' },
            { value: 'c', text: 'yield to all trains at the crossing.' },
            { value: 'd', text: 'speed up to beat the train.' }
        ],
        answer: 'c',
        explanation: 'Trains have the right of way at railroad crossings.'
    },
    {
        id: 'passing-on-shoulder',
        question: 'You may pass another vehicle by using the shoulder of the road:',
        options: [
            { value: 'a', text: 'when the vehicle in front of you is making a left turn.' },
            { value: 'b', text: 'to go around a slow moving vehicle.' },
            { value: 'c', text: 'you are not allowed to pass on the shoulder of the road.' },
            { value: 'd', text: 'when the traffic ahead is blocked up for 250 feet.' }
        ],
        answer: 'c',
        explanation: 'Passing on the shoulder of the road is not allowed.'
    },
    {
        id: 'missed-interstate-exit',
        question: 'If you miss your exit from an interstate expressway:',
        options: [
            { value: 'a', text: 'stop in any lane of the highway' },
            { value: 'b', text: 'get off at the next exit and come back to the exit you missed' },
            { value: 'c', text: 'roll down your window and ask the driver next to you for help' },
            { value: 'd', text: 'back up on the highway' }
        ],
        answer: 'b',
        explanation: 'Continue to the next exit. Never stop or back up on an interstate.'
    },
    {
        id: 'instruction-permit-age',
        question: 'The minimum age that a person must be in order to obtain an Instruction Permit is:',
        options: [
            { value: 'a', text: '14 years old' },
            { value: 'b', text: '15 years old' },
            { value: 'c', text: '15 1/2 years old' },
            { value: 'd', text: '16 years old' }
        ],
        answer: 'b',
        explanation: 'The minimum age listed for a Missouri Instruction Permit is 15 years old.'
    },
    {
        id: 'instruction-permit-fee',
        question: 'The fee for an Instruction Permit is:',
        options: [
            { value: 'a', text: '$1.00' },
            { value: 'b', text: '$2.00' },
            { value: 'c', text: '$3.50' },
            { value: 'd', text: '$4.00' }
        ],
        answer: 'c',
        explanation: 'Check current Missouri fees for the latest amount.'
    },
    {
        id: 'license-renewal-reminder',
        question: 'Shortly before your driver or nondriver license expires, the Driver License Bureau will mail a renewal reminder postcard to:',
        options: [
            { value: 'a', text: 'the most current address on your driver record' },
            { value: 'b', text: 'the address on your last application' },
            { value: 'c', text: 'the address in your local phone book' },
            { value: 'd', text: 'your local contract office' }
        ],
        answer: 'a',
        explanation: 'Keep the address on your driver record current.'
    },
    {
        id: 'motorcycle-permit-age',
        question: 'The minimum age that a person must be in order to obtain a motorcycle instruction permit is:',
        options: [
            { value: 'a', text: '14 years old' },
            { value: 'b', text: '15 years old' },
            { value: 'c', text: '15 1/2 years old' },
            { value: 'd', text: '16 years old' }
        ],
        answer: 'c',
        explanation: 'Check current Missouri requirements for motorcycle instruction permits.'
    },
    {
        id: 'intermediate-license-restrictions',
        question: 'For a driver with an intermediate license, the driving restrictions are:',
        options: [
            { value: 'a', text: 'seat belt must be worn by the driver' },
            { value: 'b', text: 'seat belts must be worn by all passengers' },
            { value: 'c', text: 'a driving curfew from 1:00 a.m. to 5:00 a.m.' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Follow the seat belt and nighttime driving restrictions that apply to intermediate licenses.'
    },
    {
        id: 'organ-donor',
        question: 'To help others know that you want to be an organ donor, you should:',
        options: [
            { value: 'a', text: 'complete the organ donor information on the back of your license' },
            { value: 'b', text: 'discuss your decision with your next of kin' },
            { value: 'c', text: 'have two witnesses sign the back of your license' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Make your wishes known and follow the applicable organ donor registration process.'
    },
    {
        id: 'driver-examination-location',
        question: 'Where should you go to take the Missouri driver examination tests:',
        options: [
            { value: 'a', text: 'any Missouri State Highway Patrol examination station' },
            { value: 'b', text: 'any Department of Transportation office' },
            { value: 'c', text: 'any Missouri contract office' },
            { value: 'd', text: 'the nearest high school driver education class' }
        ],
        answer: 'a',
        explanation: 'Driver examinations are administered at designated examination stations.'
    },
    {
        id: 'vehicle-driving-test-inspection',
        question: 'The Missouri State Highway Patrol examiner will check the person’s vehicle before beginning the driving test:',
        options: [
            { value: 'a', text: 'to look for stolen car parts' },
            { value: 'b', text: 'to make sure that the vehicle has the required equipment' },
            { value: 'c', text: 'to make sure that the vehicle is in safe operating condition' },
            { value: 'd', text: 'answers b and c' }
        ],
        answer: 'd',
        explanation: 'The vehicle must have the required equipment and be safe to operate.'
    },
    {
        id: 'fail-driving-test-three-times',
        question: 'If you fail the driving test three times:',
        options: [
            { value: 'a', text: 'the examiner will give you a Driving Skills Examination Report' },
            { value: 'b', text: 'you must send the above report to the Department of Revenue' },
            { value: 'c', text: 'the Department of Revenue will require driver training' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Follow the examiner’s instructions and any additional requirements after repeated unsuccessful tests.'
    },
    {
        id: 'double-solid-yellow-lines',
        question: 'Two solid yellow lines on the pavement mean:',
        options: [
            { value: 'a', text: 'passing is allowed for both drivers' },
            { value: 'b', text: 'passing is not allowed' },
            { value: 'c', text: 'passing is allowed if you are at the top of a hill' },
            { value: 'd', text: 'passing is allowed during daylight only' }
        ],
        answer: 'b',
        explanation: 'Two solid yellow lines generally prohibit crossing the lines to pass.'
    },
    {
        id: 'missouri-interstate-speed-limits',
        question: 'The minimum and maximum speed limits on Missouri interstate highways are:',
        options: [
            { value: 'a', text: '40/55' },
            { value: 'b', text: '40/70' },
            { value: 'c', text: '30/70' },
            { value: 'd', text: '55/75' }
        ],
        answer: 'd',
        explanation: 'Always follow posted speed limits and current Missouri law.'
    },
    {
        id: 'flashing-red-light',
        question: 'A flashing red light on a traffic signal means:',
        options: [
            { value: 'a', text: 'the same thing as a stop sign' },
            { value: 'b', text: 'the traffic signal is broken' },
            { value: 'c', text: 'you do not have to come to a complete stop' },
            { value: 'd', text: 'driving conditions are dangerous' }
        ],
        answer: 'a',
        explanation: 'A flashing red signal requires you to stop and proceed when safe.'
    },
    {
        id: 'yellow-signal-light',
        question: 'A yellow signal light means:',
        options: [
            { value: 'a', text: 'the traffic signal is changing from green to red' },
            { value: 'b', text: 'you should slam on your brakes' },
            { value: 'c', text: 'you should increase your speed' },
            { value: 'd', text: 'the car in front of you is going too slow' }
        ],
        answer: 'a',
        explanation: 'A steady yellow light warns that the signal is about to turn red.'
    },
    {
        id: 'speed-restriction-sign',
        question: 'A speed restriction sign:',
        options: [
            { value: 'a', text: 'may be ignored in rain, snow, or icy conditions' },
            { value: 'b', text: 'has a triangular shape' },
            { value: 'c', text: 'is blue with black lettering' },
            { value: 'd', text: 'shows a recommended speed for a curve or turn' }
        ],
        answer: 'd',
        explanation: 'Advisory speed signs recommend a safe speed for a curve or turn.'
    },
    {
        id: 'approaching-railroad-crossing',
        question: 'When approaching a railroad crossing you should:',
        options: [
            { value: 'a', text: 'slow down' },
            { value: 'b', text: 'look for a train' },
            { value: 'c', text: 'be ready to stop' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Slow down, look for trains, and be prepared to stop.'
    },
    {
        id: 'work-zone-signs',
        question: 'Work zone signs mean:',
        options: [
            { value: 'a', text: 'it is summer' },
            { value: 'b', text: 'you must immediately stop and back up' },
            { value: 'c', text: 'less than ideal conditions are present for driving' },
            { value: 'd', text: 'you should drive faster to get out of the work zone' }
        ],
        answer: 'c',
        explanation: 'Work zones may have changing road conditions, workers, and hazards.'
    },
    {
        id: 'no-right-on-red',
        question: 'A “No Right On Red” sign means:',
        options: [
            { value: 'a', text: 'even if the traffic signal is red, you may turn right' },
            { value: 'b', text: 'if the traffic signal is red, you cannot turn right' },
            { value: 'c', text: 'the intersection has a high number of traffic crashes' },
            { value: 'd', text: 'even if the traffic signal is red, you do not have to come to a stop' }
        ],
        answer: 'b',
        explanation: 'Do not turn right on red where this sign is posted.'
    },
    {
        id: 'emergency-vehicles',
        question: 'Emergency vehicles:',
        options: [
            { value: 'a', text: 'have the right of way when using siren, horn, and red/blue lights' },
            { value: 'b', text: 'may use a loudspeaker to give instructions' },
            { value: 'c', text: 'may follow each other' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Yield appropriately to emergency vehicles and follow lawful instructions.'
    },
    {
        id: 'school-bus-children',
        question: 'After stopping for a school bus that is unloading children:',
        options: [
            { value: 'a', text: 'do not proceed until the children wave to you' },
            { value: 'b', text: 'watch for children walking along the side of the road' },
            { value: 'c', text: 'accelerate quickly' },
            { value: 'd', text: 'turn on your emergency flashers' }
        ],
        answer: 'b',
        explanation: 'Watch carefully for children before proceeding when it is legal and safe.'
    },
    {
        id: 'turn-signal-distance',
        question: 'When making right or left turns, a driver should signal ________ before the turn:',
        options: [
            { value: 'a', text: '100 feet' },
            { value: 'b', text: '50 feet' },
            { value: 'c', text: '35 feet' },
            { value: 'd', text: '5 feet' }
        ],
        answer: 'a',
        explanation: 'Signal at least 100 feet before turning, as required by the listed rule.'
    },
    {
        id: 'handicapped-parking',
        question: 'A driver may use a handicapped parking space:',
        options: [
            { value: 'a', text: 'if a physically handicapped person is in the motor vehicle when it is parked' },
            { value: 'b', text: 'if a physically handicapped person is being delivered or picked up' },
            { value: 'c', text: 'if the vehicle displays a handicapped person placard or license plates' },
            { value: 'd', text: 'answers a and c, or b and c' }
        ],
        answer: 'd',
        explanation: 'The vehicle must meet the applicable disability parking requirements.'
    },
    {
        id: 'downhill-parking',
        question: 'When parking your vehicle downhill on a two-way street:',
        options: [
            { value: 'a', text: 'turn your wheels to the right' },
            { value: 'b', text: 'turn your wheels to the left' },
            { value: 'c', text: 'keep your wheels pointed straight ahead' },
            { value: 'd', text: 'leave your transmission in neutral' }
        ],
        answer: 'a',
        explanation: 'Turn the wheels toward the curb when parking downhill.'
    },
    {
        id: 'green-traffic-signal',
        question: 'When a traffic signal light turns green, you should:',
        options: [
            { value: 'a', text: 'yield the right-of-way to pedestrians' },
            { value: 'b', text: 'accelerate as quickly as possible to the next intersection' },
            { value: 'c', text: 'back up slowly' },
            { value: 'd', text: 'not move until another driver waves you on' }
        ],
        answer: 'a',
        explanation: 'Check the intersection and yield to pedestrians before proceeding.'
    },
    {
        id: 'littering',
        question: 'Littering:',
        options: [
            { value: 'a', text: 'is against the law' },
            { value: 'b', text: 'may cause a traffic crash' },
            { value: 'c', text: 'can lead to a $1,000 fine and up to one year in jail' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Littering is illegal and can create road hazards and penalties.'
    },
    {
        id: 'tractor-trailer-stopping-distance',
        question: 'A fully loaded tractor-trailer traveling 55 mph could take up to ______ to come to a complete stop:',
        options: [
            { value: 'a', text: '50 feet' },
            { value: 'b', text: '125 feet' },
            { value: 'c', text: '400 feet' },
            { value: 'd', text: '750 feet' }
        ],
        answer: 'c',
        explanation: 'A fully loaded tractor-trailer needs considerable distance to stop.'
    },
    {
        id: 'truck-no-zone',
        question: 'The “No-Zone” is:',
        options: [
            { value: 'a', text: 'the term used to describe the blind spots around a truck or bus' },
            { value: 'b', text: 'a special speed zone' },
            { value: 'c', text: 'a roadway with restrictions on vehicle stereo volume' },
            { value: 'd', text: 'the television show that replaced The Twilight Zone' }
        ],
        answer: 'a',
        explanation: 'The No-Zone refers to large blind spots around trucks and buses.'
    },
    {
        id: 'seat-belts-child-restraints',
        question: 'The following is true regarding seat belts and child restraints in vehicles:',
        options: [
            { value: 'a', text: 'you should never place an infant or small child in the front seat of a vehicle with airbags' },
            { value: 'b', text: 'an airbag can be dangerous to an infant or small child even in a low speed collision' },
            { value: 'c', text: 'you should always make sure all your passengers are using a seat belt or child restraint' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Use proper restraints and follow child passenger safety guidance.'
    },
    {
        id: 'tailgated',
        question: 'When you are being “tailgated”:',
        options: [
            { value: 'a', text: 'if there is an open lane to your right, move over to the right' },
            { value: 'b', text: 'if there is not an open lane to your right, wait until the way is clear ahead, and reduce speed slowly to encourage the tailgater to drive around you' },
            { value: 'c', text: 'never slow down quickly' },
            { value: 'd', text: 'all of the above' }
        ],
        answer: 'd',
        explanation: 'Stay calm, avoid sudden braking, and allow the tailgater to pass safely.'
    },
    {
        id: 'liability-insurance',
        question: 'Liability insurance:',
        options: [
            { value: 'a', text: 'is required for all motor vehicle owners in Missouri' },
            { value: 'b', text: 'covers the policyholder’s legal liability resulting from injuries to other persons or damage to their property' },
            { value: 'c', text: 'can be dropped as soon as you register your motor vehicle' },
            { value: 'd', text: 'answers a and b' }
        ],
        answer: 'd',
        explanation: 'Liability insurance helps cover covered injuries or property damage for which you are legally responsible.'
    },
    {
        id: 'proof-of-insurance',
        question: 'You must keep proof of your liability insurance:',
        options: [
            { value: 'a', text: 'at your office' },
            { value: 'b', text: 'in a safety deposit box at the bank' },
            { value: 'c', text: 'in your vehicle whenever it is being operated' },
            { value: 'd', text: 'at your neighbor’s house' }
        ],
        answer: 'c',
        explanation: 'Keep proof of insurance available when operating the vehicle.'
    },
    {
        id: 'unpaid-crash-damages',
        question: 'If you are at fault in a traffic crash and do not pay for the damages:',
        options: [
            { value: 'a', text: 'your driver license or plates or both will be suspended for one year.' },
            { value: 'b', text: 'you will save money' },
            { value: 'c', text: 'your car will be repossessed' },
            { value: 'd', text: 'you must buy a new car' }
        ],
        answer: 'a',
        explanation: 'Unpaid crash damages can lead to driver license or plate suspension.'
    },
    {
        id: 'reporting-crashes',
        question: 'You must report all vehicle crashes to the Driver License Bureau if:',
        options: [
            { value: 'a', text: 'the crash involved an uninsured motorist and there was property damage costing more than $500' },
            { value: 'b', text: 'your vehicle is less than 5 years old' },
            { value: 'c', text: 'someone was injured or killed' },
            { value: 'd', text: 'answers a and c' }
        ],
        answer: 'd',
        explanation: 'Certain crashes must be reported to the Driver License Bureau.'
    },
    {
        id: 'satop',
        question: 'SATOP is an abbreviation for:',
        options: [
            { value: 'a', text: 'Substance Abuse Traffic Offender Program' },
            { value: 'b', text: 'Salt And Tar On Pavement' },
            { value: 'c', text: 'Steer At The Other Point' },
            { value: 'd', text: 'Stop Airing Tires Over Pressure' }
        ],
        answer: 'a',
        explanation: 'SATOP stands for Substance Abuse Traffic Offender Program.'
    },
    {
        id: 'ignition-interlock-cost',
        question: 'If you are ordered to install an ignition interlock on your vehicle, the cost of installation and monthly inspection must be paid by:',
        options: [
            { value: 'a', text: 'the court clerk' },
            { value: 'b', text: 'the police officer' },
            { value: 'c', text: 'you' },
            { value: 'd', text: 'the judge' }
        ],
        answer: 'c',
        explanation: 'The driver is responsible for the applicable installation and inspection costs.'
    },
    {
        id: 'adult-bac-limit',
        question: 'In Missouri, the blood alcohol concentration (BAC) level at which it is illegal for an adult driver to operate a motor vehicle is:',
        options: [
            { value: 'a', text: '.08% or more' },
            { value: 'b', text: '.05% or more' },
            { value: 'c', text: '.020% or more' },
            { value: 'd', text: '.008% or more' }
        ],
        answer: 'a',
        explanation: 'Different alcohol limits may apply to drivers under 21 and commercial drivers.'
    },
    {
        id: 'point-advisory-letter',
        question: 'A point accumulation advisory letter will be sent to you if you:',
        options: [
            { value: 'a', text: 'have too many points taken off of your driver record' },
            { value: 'b', text: 'accumulate a total of 4 points in 12 months' },
            { value: 'c', text: 'do not score enough points on your driver test' },
            { value: 'd', text: 'fail the written test' }
        ],
        answer: 'b',
        explanation: 'Points can accumulate on your driving record and may lead to notices or penalties.'
    },
    {
        id: 'driver-record-points',
        question: 'Points:',
        options: [
            { value: 'a', text: 'are nothing to worry about' },
            { value: 'b', text: 'are a good thing to have on your driver record' },
            { value: 'c', text: 'are helpful if you want to get a job driving' },
            { value: 'd', text: 'are something you don’t want on your driver record' }
        ],
        answer: 'd',
        explanation: 'Traffic violation points can have negative consequences for your driving record.'
    },
    {
        id: 'fact-abbreviation',
        question: 'FACT is an abbreviation for:',
        options: [
            { value: 'a', text: 'Finance A Car Today' },
            { value: 'b', text: 'Full Ambulance Cannot Turn' },
            { value: 'c', text: 'Fear of Authority Causes Tension' },
            { value: 'd', text: 'Failure to Appear in Court for Traffic violations' }
        ],
        answer: 'd',
        explanation: 'FACT stands for Failure to Appear in Court for Traffic Violations.'
    },
    {
        id: 'front-window-tint',
        question: 'Front door windows on a vehicle may be tinted to no more than:',
        options: [
            { value: 'a', text: '100% light blockage' },
            { value: 'b', text: 'whatever looks good' },
            { value: 'c', text: '65% light blockage' },
            { value: 'd', text: '50% light blockage' }
        ],
        answer: 'c',
        explanation: 'Check current Missouri window-tint laws for the applicable legal limit.'
    },
    {
        id: 'license-plate-frame',
        question: 'A license plate frame:',
        options: [
            { value: 'a', text: 'may cover the word Missouri on the plate' },
            { value: 'b', text: 'should not cover any information on the license plate' },
            { value: 'c', text: 'may cover the month and year registration stickers' },
            { value: 'd', text: 'may cover the wording at the bottom of the plate' }
        ],
        answer: 'b',
        explanation: 'A plate frame should not obscure required license plate information.'
    },
    {
        id: 'vehicle-title-deadline',
        question: 'When a person buys a vehicle, he or she must title the vehicle within:',
        options: [
            { value: 'a', text: '30 days' },
            { value: 'b', text: '6 months' },
            { value: 'c', text: '1 week' },
            { value: 'd', text: '1 year' }
        ],
        answer: 'a',
        explanation: 'Check current Missouri title requirements for the latest deadline.'
    }
];



const flashcards = [
    {
        name: "Railroad Crossing Without Gates",
        meaning: "Slow down, look and listen for trains, and yield to any train. Never enter the tracks if a train is approaching.",
        image: "images/railroad.svg",
        alt: "Railroad crossing warning sign."
    },
    {
        name: "Passing on the Shoulder",
        meaning: "Do not pass another vehicle by driving on the shoulder. The shoulder is not a normal travel lane.",
        image: "",
        alt: ""
    },
    {
        name: "Missed an Interstate Exit",
        meaning: "You should continue to the next exit, leave the interstate, and follow the road or signs to get back to your intended route. Never back up or stop on the interstate to reach a missed exit.",
        image: "",
        alt: ""
    },
    {
        name: "Instruction Permit Minimum Age",
        meaning: "The minimum age to apply for a Missouri instruction permit is 15 years old. Check current Missouri requirements before applying.",
        image: "",
        alt: ""
    },
    {
        name: "Instruction Permit Fee",
        meaning: "The instruction permit fee as $3.50. Fees can change, so verify the current amount with the Missouri Department of Revenue.",
        image: "",
        alt: ""
    },
    {
        name: "License Renewal Reminder",
        meaning: "A license renewal reminder is sent to the most current address on your driver record. Keep your address updated with the state.",
        image: "",
        alt: ""
    },
    {
        name: "Motorcycle Instruction Permit Age",
        meaning: "15½ years is the minimum age for a motorcycle instruction permit.",
        image: "",
        alt: ""
    },
    {
        name: "Intermediate License Restrictions",
        meaning: "There are 3: wear your seat belt, ensure passengers follow seat-belt requirements, and follow the restricted-hours rule of 1–5 a.m. Exceptions may apply.",
        image: "",
        alt: ""
    },
    {
        name: "Organ Donor Registration",
        meaning: "Organ donor registration options can include registering through driver licensing and other approved registration methods.",
        image: "",
        alt: ""
    },
    {
        name: "Where to Take the Missouri Driver Exam",
        meaning: "You may take the driver examination at a Missouri State Highway Patrol examination station. Check the official site for locations and testing details.",
        image: "",
        alt: ""
    },
    {
        name: "Vehicle Check Before Driving Test",
        meaning: "Before the driving test, make sure the vehicle has required equipment and is safe to operate. Check items such as lights, signals, tires, brakes, seat belts, and other required equipment.",
        image: "",
        alt: ""
    },
    {
        name: "Failing the Driving Test Three Times",
        meaning: "Follow the examiner's instructions about retesting and any additional requirements after repeated failures.",
        image: "",
        alt: ""
    },
    {
        name: "Two Solid Yellow Lines",
        meaning: "Two solid yellow center lines mean you must not cross them to pass another vehicle. Follow any applicable turning rules and road markings.",
        image: "images/double-yellow.svg",
        alt: "Two solid yellow center lines indicate that passing across the lines is prohibited."
    },
    {
        name: "Missouri Interstate Speed Limits",
        meaning: "A minimum of 40 mph and a maximum of 70 mph. Always follow posted signs and any speed restrictions that apply to your vehicle or road.",
        image: "",
        alt: ""
    },
    {
        name: "Flashing Red Traffic Signal",
        meaning: "A flashing red light means stop completely, just as you would at a stop sign. Check for pedestrians and other traffic, then proceed only when it is safe and lawful.",
        image: "images/flashing-red.svg",
        alt: "A flashing red traffic signal means come to a complete stop before proceeding when safe."
    },
    {
        name: "Yellow Traffic Signal",
        meaning: "A steady yellow light warns that the signal is about to turn red. Stop if you can do so safely; do not speed up to beat the red light.",
        image: "images/yellow-signal.svg",
        alt: "A yellow traffic signal warns that the light is changing to red."
    },
    {
        name: "Speed Restriction Sign",
        meaning: "This sign gives a recommended safe speed for a curve or turn. It warns drivers to slow down for the road conditions; it is not necessarily the same as the posted speed limit.",
        image: "images/speed-limit.svg",
        alt: "A curve or turn advisory speed sign shows a recommended speed for that section of road."
    },
    {
        name: "Approaching a Railroad Crossing",
        meaning: "Slow down as you approach the tracks, look and listen for a train, and be prepared to stop. Never drive onto the tracks unless there is enough space to cross completely.",
        image: "images/railroad.svg",
        alt: "Railroad crossing warning sign."
    },
    {
        name: "Work Zone Signs",
        meaning: "Work-zone signs warn of roadwork or changed driving conditions, such as lane closures, workers, uneven pavement, or slow-moving traffic. Reduce speed and follow posted directions.",
        image: "images/work-zone.svg",
        alt: "Work-zone signs warn drivers of roadwork and changed traffic conditions."
    },
    {
        name: "No Right on Red Sign",
        meaning: "Do not turn right while the traffic signal is red. Wait until the signal turns green and make the turn when it is safe.",
        image: "images/no-right-on-red.svg",
        alt: "A no-right-on-red sign prohibits right turns while the traffic signal is red."
    },
    {
        name: "Emergency Vehicles",
        meaning: "When an emergency vehicle approaches using its warning signals, safely yield and give it room to pass. Follow the rules for pulling over and stopping.",
        image: "",
        alt: ""
    },
    {
        name: "After Stopping for a School Bus",
        meaning: "After stopping for a school bus, watch carefully for children crossing or walking near the roadway. Do not move until it is safe and the applicable school-bus stopping rules allow you to proceed.",
        image: "",
        alt: ""
    },
    {
        name: "Turn Signal Distance",
        meaning: "You need to signal at least 100 feet before turning. Signal early enough to warn other road users before you begin the turn.",
        image: "",
        alt: ""
    },
    {
        name: "Handicapped Parking Space",
        meaning: "A vehicle may use a disability parking space only when the required disability parking authorization is displayed and the space is being used according to the rules. A pickup or drop-off does not automatically permit unauthorized parking.",
        image: "",
        alt: ""
    },
    {
        name: "Parking Downhill on a Two-Way Street",
        meaning: "When parking downhill, turn the front wheels toward the curb or right-hand edge of the road. This helps the vehicle roll toward the curb if the brakes fail.",
        image: "",
        alt: ""
    },
    {
        name: "Green Traffic Signal",
        meaning: "A green light allows you to proceed only when the intersection is clear. Yield to pedestrians and vehicles that already have the right-of-way, and do not enter if traffic is blocking the intersection.",
        image: "",
        alt: ""
    },
    {
        name: "Littering",
        meaning: "Do not throw trash or other objects from your vehicle; littering can create hazards and may result in penalties.",
        image: "",
        alt: ""
    },
    {
        name: "Stopping Distance for a Loaded Tractor-Trailer",
        meaning: "You need up to 400 feet to stop at 55 mph for a loaded tractor-trailer. Large vehicles need much more distance to stop than passenger cars, so do not cut in front of them.",
        image: "",
        alt: ""
    },
    {
        name: "Truck and Bus No-Zone",
        meaning: "A no-zone is a large blind spot around a truck or bus where the driver may not see your vehicle. Avoid lingering beside or directly behind large vehicles, and leave plenty of room when passing.",
        image: "",
        alt: ""
    },
    {
        name: "Seat Belts and Child Restraints",
        meaning: "Follow Missouri's seat-belt requirements, and use the appropriate child safety seat or restraint for children as required by law.",
        image: "",
        alt: ""
    },
    {
        name: "Being Tailgated",
        meaning: "If another driver follows too closely, stay calm, maintain a steady speed, leave extra space ahead, and let the driver pass when it is safe. Avoid sudden braking or confrontations.",
        image: "",
        alt: ""
    },
    {
        name: "Liability Insurance",
        meaning: "Liability insurance helps cover injury or property damage you are legally responsible for after a crash. Missouri vehicle owners generally must maintain the required financial responsibility unless an exception applies.",
        image: "",
        alt: ""
    },
    {
        name: "Proof of Liability Insurance",
        meaning: "Keep acceptable proof of insurance available whenever you operate the vehicle. You may need to show it to law enforcement or provide it after a crash.",
        image: "",
        alt: ""
    },
    {
        name: "Not Paying Crash Damages",
        meaning: "If you do not pay crash damages your driver license, license plates, or both may be suspended for one year when required crash-damage obligations are not met. The exact outcome depends on the applicable legal requirements.",
        image: "",
        alt: ""
    },
    {
        name: "Reporting a Vehicle Crash",
        meaning: "A crash must be reported when an uninsured motorist is involved and property damage exceeds $500, or when someone is injured or killed. Verify the current reporting rules and deadlines with Missouri authorities.",
        image: "",
        alt: ""
    },
    {
        name: "SATOP",
        meaning: "SATOP stands for Substance Abuse Traffic Offender Program. It is a Missouri program related to substance use and traffic offenses.",
        image: "",
        alt: ""
    },
    {
        name: "Ignition Interlock Costs",
        meaning: "The driver must pay the ignition interlock device's installation and monthly inspection costs. An ignition interlock prevents a vehicle from starting if alcohol is detected above the device's set limit.",
        image: "",
        alt: ""
    },
    {
        name: "Adult Driver BAC Limit",
        meaning: "The limit is 0.08% blood alcohol concentration (BAC) or more. Alcohol can impair driving before this level, and separate rules may apply to certain drivers.",
        image: "",
        alt: ""
    },
    {
        name: "Point Accumulation Advisory Letter",
        meaning: "An advisory letter may be sent after accumulating 4 points within 12 months. Driver-license points can lead to additional consequences if more violations occur.",
        image: "",
        alt: ""
    },
    {
        name: "Driver Record Points",
        meaning: "Missouri adds points to a driving record for certain traffic convictions. Accumulating too many points can lead to license suspension or revocation, so drive safely and avoid violations.",
        image: "",
        alt: ""
    },
    {
        name: "FACT",
        meaning: "FACT means Failure to Appear in Court for Traffic violations. Failing to respond to a traffic citation can have consequences for your driving privileges.",
        image: "",
        alt: ""
    },
    {
        name: "Front Door Window Tint",
        meaning: "No more than 65% light blockage. This means at least 35% of light passes through the window. Check current Missouri tint requirements before applying tint.",
        image: "",
        alt: ""
    },
    {
        name: "License Plate Frame",
        meaning: "A license plate frame must not cover required information on the plate, such as identifying letters, numbers, or other required markings. Keep the plate readable.",
        image: "",
        alt: ""
    },
    {
        name: "Vehicle Title Deadline",
        meaning: "You need to title the vehicle within 30 days of purchase.",
        image: "",
        alt: ""
    }
];




function showFlashcard() {
    const card = flashcards[currentCardIndex];
    const cardElement = document.getElementById('flashcard');

    if (!card || !cardElement) {
        return;
    }

    const frontTitle = document.getElementById('flashcard-front-title');
    const backMeaning = document.getElementById('flashcard-back-meaning');
    const backImage = document.getElementById('flashcard-back-image');
    const cardCount = document.getElementById('flashcard-count');

    if (frontTitle) {
        frontTitle.textContent = card.name;
    }

    if (backMeaning) {
        backMeaning.textContent = card.meaning;
    }

    if (cardCount) {
        cardCount.textContent =
            'Card ' + (currentCardIndex + 1) + ' of ' + flashcards.length;
    }

    if (backImage) {
        if (card.image) {
            backImage.src = card.image;
            backImage.alt = card.alt || '';
            backImage.hidden = false;
        } else {
            backImage.removeAttribute('src');
            backImage.alt = '';
            backImage.hidden = true;
        }
    }

    cardElement.classList.toggle('flipped', cardIsFlipped);

    cardElement.setAttribute(
        'aria-label',
        card.name + ' flashcard. Click to ' +
        (cardIsFlipped ? 'see the topic' : 'see the definition')
    );

    cardElement.setAttribute('aria-pressed', String(cardIsFlipped));
}

function flipFlashcard() {
    cardIsFlipped = !cardIsFlipped;
    showFlashcard();
}


function setAccountMode(mode) {
    accountMode = mode;
    const signingUp = mode === 'signup';
    document.getElementById('name-field').hidden = !signingUp;
    document.getElementById('account-name').required = signingUp;
    document.getElementById('account-title').textContent = signingUp ? 'Create your account' : 'Welcome back';
    document.getElementById('account-description').textContent = signingUp
        ? 'Create an account to save scores and review missed questions.'
        : 'Sign in to save your quiz scores and missed questions.';
    document.getElementById('account-submit').textContent = signingUp ? 'Create Account' : 'Sign In';
    document.getElementById('password').autocomplete = signingUp ? 'new-password' : 'current-password';
    document.getElementById('show-signin').classList.toggle('active', !signingUp);
    document.getElementById('show-signup').classList.toggle('active', signingUp);
    document.getElementById('login-message').textContent = '';
}

function openAccountPage(mode) {
    pageAfterLogin = 'results';
    setAccountMode(mode || 'signin');
    showPage('login');
}

function getAccounts() {
    try {
        return JSON.parse(localStorage.getItem('roadReadyAccounts')) || {};
    } catch (error) {
        return {};
    }
}

function saveAccountProgress() {
    if (!currentAccount) return;
    const accounts = getAccounts();
    if (!accounts[currentAccount]) return;
    accounts[currentAccount].scores = accounts[currentAccount].scores || [];
    if (lastQuizScore !== null) {
        accounts[currentAccount].scores.push({ score: lastQuizScore, completed: totalAnswered, date: new Date().toLocaleDateString() });
    }
    accounts[currentAccount].missed = getMissedQuestions();
    localStorage.setItem('roadReadyAccounts', JSON.stringify(accounts));
}

function showSavePrompt() {
    if (scorePromptShown) return;
    scorePromptShown = true;
    if (!loggedIn) {
        document.getElementById('save-score-prompt').hidden = false;
    } else {
        saveAccountProgress();
    }
}

function getMissedQuestions() {
    try {
        return JSON.parse(localStorage.getItem('roadReadyMissed')) || [];
    } catch (error) {
        return [];
    }
}


function saveMissedQuestion(question, selectedAnswer) {
    let missedQuestions = getMissedQuestions();

    const alreadySaved = missedQuestions.some(function(item) {
        return item.id === question.id;
    });

    if (!alreadySaved) {
        missedQuestions.push({
            id: question.id,
            selectedAnswer: selectedAnswer
        });
    } else {
        missedQuestions = missedQuestions.map(function(item) {
            if (item.id === question.id) {
                item.selectedAnswer = selectedAnswer;
            }

            return item;
        });
    }

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function removeMissedQuestion(questionId) {
    const missedQuestions = getMissedQuestions().filter(function(item) {
        return item.id !== questionId;
    });

    localStorage.setItem(
        'roadReadyMissed',
        JSON.stringify(missedQuestions)
    );
}


function renderRandomQuestion() {
    let availableQuestions = questionBank;

    if (questionBank.length > 1 && lastQuestionId) {
        availableQuestions = questionBank.filter(function(question) {
            return question.id !== lastQuestionId;
        });
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];

    questionToPractice = null;
    showQuestion();
}


function practiceQuestion(questionId) {
    questionToPractice = questionId;
    showPage('quiz');
}


function showQuestion() {
    const questionArea = document.getElementById('quiz-question-area');
    const feedback = document.getElementById('quiz-feedback');
    const submitButton = document.getElementById('submit-quiz');
    const nextButton = document.getElementById('next-question');
    const questionCount = document.getElementById('question-count');

    if (!questionArea || !currentQuestion) {
        return;
    }

    questionCount.textContent = 'Practice Question';

    let questionHTML = '<div class="quiz-question">';
    questionHTML += '<h3>' + currentQuestion.question + '</h3>';

    currentQuestion.options.forEach(function(option) {
        questionHTML += `
            <label class="answer-option" data-value="${option.value}">
                <input type="radio" name="quiz-answer" value="${option.value}">
                <span>${option.text}</span>
            </label>
        `;
    });

    questionHTML += '</div>';
    questionArea.innerHTML = questionHTML;

    feedback.textContent = '';
    feedback.className = '';
    submitButton.hidden = false;
    submitButton.disabled = false;
    nextButton.hidden = true;
    quizFinished = false;
}


function renderMissedQuestions() {
    const practiceArea = document.getElementById('missed-questions');
    const countLabel = document.getElementById('missed-count');

    if (!practiceArea) {
        return;
    }

    const missedQuestions = getMissedQuestions();

    countLabel.textContent = missedQuestions.length + ' questions';

    if (missedQuestions.length === 0) {
        practiceArea.innerHTML =
            '<p>You do not have any missed questions yet. Keep practicing!</p>';
        return;
    }

    practiceArea.innerHTML = '';

    missedQuestions.forEach(function(missed) {
        const question = questionBank.find(function(item) {
            return item.id === missed.id;
        });

        if (!question) {
            return;
        }

        const chosenOption = question.options.find(function(option) {
            return option.value === missed.selectedAnswer;
        });

        const correctOption = question.options.find(function(option) {
            return option.value === question.answer;
        });

        const card = document.createElement('article');
        card.className = 'missed-question';

        const heading = document.createElement('h3');
        heading.textContent = question.question;

        const wrongAnswer = document.createElement('p');
        wrongAnswer.className = 'wrong-answer';
        wrongAnswer.textContent = 'Your previous answer: ' +
            (chosenOption ? chosenOption.text : 'Not available');

        const rightAnswer = document.createElement('p');
        rightAnswer.className = 'right-answer';
        rightAnswer.textContent = 'Correct answer: ' + correctOption.text;

        const explanation = document.createElement('p');
        explanation.textContent = question.explanation;

        const practiceButton = document.createElement('button');
        practiceButton.className = 'btn btn-secondary';
        practiceButton.textContent = 'Try This Question';

        practiceButton.addEventListener('click', function() {
            practiceQuestion(question.id);
        });

        card.appendChild(heading);
        card.appendChild(wrongAnswer);
        card.appendChild(rightAnswer);
        card.appendChild(explanation);
        card.appendChild(practiceButton);

        practiceArea.appendChild(card);
    });
}


function updateResults() {
    const score = totalAnswered === 0
        ? 0
        : Math.round((totalCorrect / totalAnswered) * 100);

    document.getElementById('result-score').textContent = score + '%';
    document.getElementById('result-completed').textContent = totalAnswered;
    document.getElementById('result-missed').textContent =
        getMissedQuestions().length;
    const savedSummary = document.getElementById('saved-score-summary');
    if (savedSummary) {
        if (currentAccount) {
            const account = getAccounts()[currentAccount];
            const scores = account && account.scores ? account.scores : [];
            savedSummary.textContent = scores.length ? 'Saved attempts: ' + scores.map(function(item) { return item.score + '% (' + item.date + ')'; }).join(', ') : 'No saved quiz attempts yet.';
        } else {
            savedSummary.textContent = 'Sign in if you want to save and compare your scores.';
        }
    }
}


function checkAnswer() {
    if (!currentQuestion || quizFinished) {
        return;
    }

    const selectedAnswer = document.querySelector(
        'input[name="quiz-answer"]:checked'
    );

    const feedback = document.getElementById('quiz-feedback');

    if (!selectedAnswer) {
        feedback.textContent = 'Please select an answer first.';
        feedback.className = '';
        return;
    }

    quizFinished = true;
    totalAnswered++;

    const isCorrect = selectedAnswer.value === currentQuestion.answer;

    if (isCorrect) {
        totalCorrect++;
        removeMissedQuestion(currentQuestion.id);

        feedback.textContent = 'Correct! ' + currentQuestion.explanation;
        feedback.className = 'correct-message';
    } else {
        saveMissedQuestion(currentQuestion, selectedAnswer.value);

        feedback.textContent = 'Incorrect. The correct answer is "' +
            currentQuestion.options.find(function(option) {
                return option.value === currentQuestion.answer;
            }).text + '". ' + currentQuestion.explanation;

        feedback.className = 'incorrect-message';
    }

  
    document.querySelectorAll('.answer-option').forEach(function(label) {
        const answerValue = label.dataset.value;

        if (answerValue === currentQuestion.answer) {
            label.classList.add('correct');
        } else if (answerValue === selectedAnswer.value) {
            label.classList.add('incorrect');
        }
    });

    
    document.querySelectorAll('input[name="quiz-answer"]').forEach(function(input) {
        input.disabled = true;
    });

    document.getElementById('submit-quiz').disabled = true;
    document.getElementById('next-question').hidden = false;

    lastQuestionId = currentQuestion.id;

    renderMissedQuestions();
    updateResults();
    lastQuizScore = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
    if (loggedIn) {
        saveAccountProgress();
    } else {
        showSavePrompt();
    }
}


function nextQuestion() {
    if (questionToPractice) {
        const question = questionBank.find(function(item) {
            return item.id === questionToPractice;
        });

        questionToPractice = null;

        if (question) {
            currentQuestion = question;
            showQuestion();
            return;
        }
    }

    renderRandomQuestion();
}


function showPage(pageName) {
    const selectedPage = document.getElementById(pageName);

    if (!selectedPage || !selectedPage.classList.contains('page')) {
        return;
    }
    

    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.remove('active');
    });

    document.getElementById(pageName).classList.add('active');

    if (pageName === 'quiz') {
        if (questionToPractice) {
            const question = questionBank.find(function(item) {
                return item.id === questionToPractice;
            });

            if (question) {
                currentQuestion = question;
                showQuestion();
            } else {
                renderRandomQuestion();
            }
        } else {
            renderRandomQuestion();
        }
    }

    if (pageName === 'game') {
        renderMissedQuestions();
    }

    if (pageName === 'results') {
        updateResults();
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



function continueTo(pageName) {
    showPage(pageName);
}


document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');

    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    });

    
    document.getElementById('submit-quiz').addEventListener('click', checkAnswer);

    document.getElementById('next-question').addEventListener('click', nextQuestion);

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    document.getElementById('show-signin').addEventListener('click', function() {
        setAccountMode('signin');
    });
    document.getElementById('show-signup').addEventListener('click', function() {
        setAccountMode('signup');
    });
    document.getElementById('flashcard').addEventListener('click', flipFlashcard);
    document.getElementById('previous-card').addEventListener('click', function() {
        currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
        cardIsFlipped = false;
        showFlashcard();
    });
    document.getElementById('next-card').addEventListener('click', function() {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        cardIsFlipped = false;
        showFlashcard();
    });
    document.getElementById('skip-save-prompt').addEventListener('click', function() {
        document.getElementById('save-score-prompt').hidden = true;
    });
    document.getElementById('finish-game').addEventListener('click', function() {
        lastQuizScore = totalAnswered === 0 ? 0 : Math.round((totalCorrect / totalAnswered) * 100);
        showSavePrompt();
        if (loggedIn) {
            document.getElementById('quiz-feedback').textContent = 'Your progress has been saved in this browser.';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!loginForm.reportValidity()) return;

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const name = document.getElementById('account-name').value.trim();
        const accounts = getAccounts();

        if (accountMode === 'signup') {
            if (accounts[email]) {
                loginMessage.textContent = 'An account with that email already exists. Please sign in.';
                return;
            }
            accounts[email] = { name: name, password: password, scores: [], missed: [] };
            localStorage.setItem('roadReadyAccounts', JSON.stringify(accounts));
        } else {
            if (!accounts[email] || accounts[email].password !== password) {
                loginMessage.textContent = 'Email or password not found. Check your details or create an account.';
                return;
            }
        }

        currentAccount = email;
        loggedIn = true;
        const account = getAccounts()[email];
        if (account.missed) {
            localStorage.setItem('roadReadyMissed', JSON.stringify(account.missed));
        }
        if (lastQuizScore !== null) saveAccountProgress();
        document.getElementById('account-nav-link').textContent = account.name ? account.name : 'My Account';
        document.getElementById('save-score-prompt').hidden = true;
        loginMessage.textContent = accountMode === 'signup' ? 'Account created! Your progress can now be saved in this browser.' : 'Signed in! Your saved progress is ready.';
        updateResults();
        renderMissedQuestions();
        showPage('results');
    });

    renderMissedQuestions();
    updateResults();
    showFlashcard();
});
