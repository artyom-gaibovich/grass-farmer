import {MessageContext} from "puregram";
import {StepContext} from "@puregram/scenes";
import { SessionInterface } from '@puregram/session';

export interface TelegramContextModel extends MessageContext, StepContext, SessionInterface {}
