# Generated by Django 4.0.3 on 2022-04-14 06:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AudioProcessing', '0003_delete_audio'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_roll', models.IntegerField()),
                ('audiofile', models.FileField(upload_to='documents/')),
            ],
        ),
    ]
