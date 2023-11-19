import { defineParameterType } from '@cucumber/cucumber';

defineParameterType({
    name: 'year',
    useForSnippets: true,
    regexp: /"(19|20)\d{2}"/,
    transformer: (year) => parseInt(year),
});
