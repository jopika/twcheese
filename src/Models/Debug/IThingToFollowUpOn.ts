// twcheese isn't using typescript.
//
// This file is just for reference,
// to help you make things look/swim/quack like a duck.

// @ts-ignore
import { Phase } from './Phase';

interface IThingToFollowUpOn {
    followUpPhases: Array<Phase>;
    addFollowUp(phase: Phase): any;
}
