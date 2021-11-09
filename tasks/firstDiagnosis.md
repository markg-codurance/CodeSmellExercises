##First Diagnosis

####Code smells

     * Code Comment
     * Long Method
     * Primitive Obsession

####Location
They are found in `settleAccount()`

These smell should be the first clue in order to recognise that there might be some refactoring required.
Secondly, `settleAccount()` also shows violations of `Object Calisthenics` principles with multiple levels of nesting 
and the use of the `else` construct.

There also multiple fields that can only be accessed directly, we could make them private and expose their
use via meaningfully named method pertaining to the reasons for accessing said fields, for example, `calculateInterest()`
which would use the `balance` of the account to work out what interest should be accrued. These violations
can be ignored for now, but if you found them and fixed them, brilliant.