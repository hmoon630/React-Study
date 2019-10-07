from django.db import models

# Create your models here.
class Memo(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """A string representation of the model."""
        return self.title

    class Meta:
        ordering = ['created_at']
