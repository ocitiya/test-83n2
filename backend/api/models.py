from django.db import models
from django.core.validators import RegexValidator

validate_identity_number = RegexValidator(
    regex=r'^\d{16}$',
    message='Identity number must be a number and contain 16 characters!'
)

class Person(models.Model):
    name = models.CharField(max_length=255)
    identity_number = models.CharField(
        max_length=16,
        validators=[validate_identity_number]
    )
    email = models.EmailField()
    date_of_birth = models.DateField()

    class Meta:
        db_table = 'persons'

