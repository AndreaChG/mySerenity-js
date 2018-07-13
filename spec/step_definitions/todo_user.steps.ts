import { Actor, BrowseTheWeb } from 'serenity-js/lib/screenplay-protractor';
import { protractor } from 'protractor';
import { serenity } from 'serenity-js';

import { Start, AddATodoItem } from '../tasks';
import { listOf } from '../support/text';
import { expect } from '../support/expect';
import { TodoList } from '../user_interface/todo_list';

export = function todoUserSteps() {

    this.setDefaultTimeout(30 * 1000);  // The todomvc.com website can sometimes be a bit slow to load, so we tell
                                        // Cucumber to give it up to 30 seconds to get ready.

    let stage = serenity.callToStageFor({
        actor: (name) => Actor.named(name).whoCan(BrowseTheWeb.using(protractor.browser))
    });

    this.Given(/^.*that (.*) has a todo list containing (.*)$/, function (name: string, items: string) {
        return stage.theActorCalled(name).attemptsTo(
            Start.withATodoListContaining(listOf(items))
        );
    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, function (itemName: string) {
        return stage.theActorInTheSpotlight().attemptsTo(
            AddATodoItem.called(itemName)
        )
    });

    this.Then(/^.* todo list should contain (.*?)$/, function (items: string) {
        return expect(stage.theActorInTheSpotlight().toSee(TodoList.Items_Displayed))
            .eventually.deep.equal(listOf(items))
    });
};
